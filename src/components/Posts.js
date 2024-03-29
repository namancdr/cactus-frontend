import { useEffect } from "react";
import { usePost } from "../context/post/postContext";
import ContentLoading from "./ContentLoading";
import PostCard from "./PostCard";

const Posts = () => {
  const { posts, fetchAllPosts } = usePost();

  useEffect(
    () => {
      fetchAllPosts();
    },
    // eslint-disable-next-line
    []
  );

  return posts ? (
    posts
      .slice()
      .reverse()
      .map((post) => {
        return <PostCard key={post._id} post={post} />;
      })
  ) : (
    <ContentLoading />
  );
};

export default Posts;
