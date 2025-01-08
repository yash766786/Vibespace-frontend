// post.jsx
import React, { useEffect } from "react";
import { usePost } from "../context/PostState";
import PostItem from "../components/Container/PostItem";

const Post = () => {
  const { getAllPosts, posts } = usePost();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Post;
