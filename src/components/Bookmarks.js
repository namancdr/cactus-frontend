import React, { useEffect } from "react";
import { usePost } from "../context/post/postContext";
import ContentLoading from "./ContentLoading";
import PostCard from "./PostCard";

const Bookmarks = () => {
  const { fetchBookmarks, bookmarks } = usePost();
  useEffect(() => {
    fetchBookmarks();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="component-style">
      <div className="mid-heading-text container">
        <h5>Saved Posts</h5>
        <hr />
        <span className="text-muted">
          {bookmarks &&
            bookmarks.length === 0 &&
            "Saved posts will appear here!"}
        </span>
      </div>
      {bookmarks ? (
        bookmarks
          .slice()
          .reverse()
          .map((post) => {
            return <PostCard key={post._id} post={post} />;
          })
      ) : (
        <ContentLoading />
      )}
    </div>
  );
};

export default Bookmarks;
