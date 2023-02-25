import { createContext, useContext, useState } from "react";
import useFetch from "../../api/apiHook";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const postContext = createContext();

export const usePost = () => {
  return useContext(postContext);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();
  const [usersPost, setUsersPost] = useState();
  const [bookmarks, setBookmarks] = useState();

  //api hook
  const {
    fetchAllPostsAPI,
    createPostAPI,
    fetchUsersPostsAPI,
    deletePostAPI,
    editpostAPI,
    likePostAPI,
    unlikePostAPI,
    fetchAllCommentsAPI,
    createCommentAPI,
    bookmarkPostAPI,
    deleteBookmarkAPI,
    fetchBookmarksAPI,
  } = useFetch();

  const fetchAllPosts = async () => {
    try {
      const data = await fetchAllPostsAPI();
      setPosts(data);
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const createPost = async (image, imagePath, textData) => {
    try {
      const data = await createPostAPI(image, imagePath, textData);
      toast(data.success, { theme: "dark" });
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const fetchUsersPosts = async () => {
    try {
      const data = await fetchUsersPostsAPI();
      setUsersPost(data);
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const deletePost = async (id) => {
    try {
      const data = await deletePostAPI(id);

      const newPosts = usersPost.filter((post) => {
        return post._id !== id;
      });
      setUsersPost(newPosts);
      toast(data.success, { theme: "dark" });
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const editPost = async (id, textData) => {
    try {
      const data = await editpostAPI(id, textData);
      toast(data.success, { theme: "dark" });
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const likePost = async (id) => {
    try {
      const data = await likePostAPI(id);
      console.log(data.success && "Liked the post");
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const unlikePost = async (id) => {
    try {
      const data = await unlikePostAPI(id);
      console.log(data.success && "Unliked the post");
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  // Comment section //////////////////////////////////////////////
  const fetchAllComments = async () => {
    try {
      const data = await fetchAllCommentsAPI();
      setComments(data);
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const createComment = async (post, commentText) => {
    try {
      const data = await createCommentAPI(post, commentText);
      toast(data.success, { theme: "dark" });
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const bookmarkPost = async (id) => {
    try {
      const data = await bookmarkPostAPI(id);
      toast(data.success, { theme: "dark" });
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const deleteBookmark = async (id) => {
    try {
      const data = await deleteBookmarkAPI(id);
      toast(data.success, { theme: "dark" });
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const fetchBookmarks = async () => {
    try {
      const data = await fetchBookmarksAPI();
      setBookmarks(data);
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const value = {
    fetchAllPosts,
    posts,
    createPost,
    fetchUsersPosts,
    usersPost,
    deletePost,
    editPost,
    likePost,
    unlikePost,
    fetchAllComments,
    comments,
    createComment,
    bookmarkPost,
    deleteBookmark,
    fetchBookmarks,
    bookmarks,
  };

  return <postContext.Provider value={value}>{children}</postContext.Provider>;
};
