import { createContext, useContext } from "react";
import useFetch from "../../api/apiHook";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};



export const UserProvider = ({ children }) => {

  const {uploadProfilePicAPI, deleteProfilePicAPI} = useFetch()
    
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

  const value = {uploadProfilePic, deleteProfilePic};

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
