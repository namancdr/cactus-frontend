import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";
import createPostIcon from "../assets/createPost.png";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    isAuthenticated && (
      <>
        <nav className="navbar navbar-expand-lg position-fixed top-0 ">
          <div className="container-fluid d-flex justify-content-between">
            <Link className="navbar-brand text-light" to="/">
              <img src={logo} alt="Cactus" />
            </Link>
            {!isAuthenticated ? (
              <form className="d-flex">
                <Link
                  to="/login"
                  className="btn  mx-1 btn-primary"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary mx-1"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <form className="d-flex align-items-center">
                <Link to="/createpost">
                  <img
                    src={createPostIcon}
                    alt="Addpost"
                    className="create-post-icon mx-2"
                  />
                </Link>
                <button onClick={handleLogout} className="btn btn-danger mx-1">
                  Logout
                </button>
              </form>
            )}
          </div>
        </nav>
      </>
    )
  );
};

export default Navbar;
