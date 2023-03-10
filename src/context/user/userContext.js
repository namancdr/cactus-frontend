import { createContext, useContext, useState } from "react";
import useFetch from "../../api/apiHook";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = ({ children }) => {
  const {
    uploadProfilePicAPI,
    deleteProfilePicAPI,
    fetchotheruserdetailsAPI,
    followUserAPI,
    unfollowUserAPI,
    searchUserAPI
  } = useFetch();

  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [searchResult, setSearchResult] = useState([])

  const uploadProfilePic = async (image, imagePath) => {
    try {
      const data = await uploadProfilePicAPI(image, imagePath);
      toast(data.success, { theme: "dark" });
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const deleteProfilePic = async () => {
    try {
      const data = await deleteProfilePicAPI();
      toast(data.success, { theme: "dark" });
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const fetchOtherUserDetails = async (username) => {
    try {
      const data = await fetchotheruserdetailsAPI(username);
      setUser(data.user);
      setPosts(data.posts);
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const followUser = async (id) => {
    try {
      const data = await followUserAPI(id);
      console.log(data.success && "Followed the user");
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const unfollowUser = async (id) => {
    try {
      const data = await unfollowUserAPI(id);
      console.log(data.success && "Unfollowed the user");
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  };

  const searchUser = async(username) => {
    try {
      const data = await searchUserAPI(username);
      setSearchResult(data)
    } catch (error) {
      toast(error, { theme: "dark" });
    }
  }

  const value = {
    uploadProfilePic,
    deleteProfilePic,
    fetchOtherUserDetails,
    user,
    posts,
    followUser,
    unfollowUser,
    searchUser,
    searchResult
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
