import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [views, setViews] = useState(0);

  const getPost = async () => {
    const { data } = await axios.get("http://localhost:4001/posts");
    console.log("데이터", data);
    return data;
  };

  const { data, isLoding, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });

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

  if (isLoding) {
    return <div>로딩중입니다</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다</div>;
  }

  return (
    <>
      <h1>포스트</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={views} onChange={(e) => setViews(e.target.value)} />
      <button onClick={handlePost}>포스팅</button>
      <div>
        {data &&
          data.map((post) => {
            return (
              <div key={post.id}>
                <p>
                  <b>타이틀 : </b>
                  {post.title} / <b>뷰 :</b> {post.views}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
