import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [views, setViews] = useState(0);
  const [comment, setComment] = useState("");

  // 포스트 불러오기
  const getPost = async () => {
    const { data } = await axios.get("http://localhost:4001/posts");
    console.log("데이터", data);
    return data;
  };

  const { data, isLoding, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });

  // 포스트 추가
  const addPost = async () => {
    await axios.post("http://localhost:4001/posts", {
      title: title,
      views: views,
    });
  };

  const handlePost = () => {
    mutation.mutate({
      title: title,
      views: views,
    });
  };

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      alert("포스팅성공!");
      queryClient.invalidateQueries("posts");
    },
  });

  // 프로필 불러오기
  const getProfile = async () => {
    const { data: profileData } = await axios.get(
      "http://localhost:4001/profile"
    );
    console.log("ㅍㄿ 데이터", profileData);
    return profileData;
  };

  const { profileData, profileLoding, profileError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  // 댓글
  const handleViewComment = () => {
    alert("댓글표시");
  };

  const handleAddComment = () => {
    alert("댓글입력");
  };
  //

  if (isLoding) {
    return <div>포스트 로딩중입니다</div>;
  }

  if (profileLoding) {
    return <div>프로필 로딩중입니다</div>;
  }
  if (isError) {
    return <div>포스트 오류가 발생했습니다</div>;
  }
  if (profileError) {
    return <div>프로필 오류가 발생했습니다</div>;
  }

  return (
    <>
      <h1>포스트</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={views} onChange={(e) => setViews(e.target.value)} />
      <button onClick={handlePost}>포스팅</button>
      <hr />
      <div>
        {profileData &&
          profileData.map((profile) => {
            return (
              <div key={profile.name}>
                <p>
                  <b>이름 : </b>
                  {profile.name}
                </p>
              </div>
            );
          })}
      </div>
      <div>
        {data &&
          data.map((post) => {
            return (
              <div key={post.id}>
                <p>
                  <div>
                    <b>타이틀 : </b>
                    {post.title} / <b>뷰 :</b> {post.views}
                    <button onClick={handleViewComment}>댓글보기</button>
                  </div>
                  <div>
                    <input value={comment} />
                    <button onClick={handleAddComment}>댓글입력</button>
                  </div>
                </p>
                <hr />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
