import { createContext, useContext, useState } from "react";
import useFetch from "../../api/apiHook";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  // state to check if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");

    if (token) {
      return true;
    } else {
      return false;
    }
  });

  // Destructuring apiHook
  const { createUserAPI, loginUserAPI, getUserAPI } = useFetch();

  // Singup handling
  const createUser = async ({ name, username, email, password }) => {
    try {
      const data = await createUserAPI({ name, username, email, password });

      if (data.success) {
        localStorage.setItem("token", data.authToken);
        setIsAuthenticated(true);
        console.log("User successfully created!");
      } else {
        console.log({ error: data.error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Login handling
  const loginUser = async ({ email, password }) => {
    try {
      const data = await loginUserAPI({ email, password });

      if (data.success) {
        localStorage.setItem("token", data.authToken);
        setIsAuthenticated(true);
        console.log("Logged in successfully");
        return Promise.resolve();
      } else {
        console.log({ error: data.error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get user detail handling
  const getUser = async () => {
    try {
      const data = await getUserAPI();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    createUser,
    loginUser,
    isAuthenticated,
    setIsAuthenticated,
    user,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
