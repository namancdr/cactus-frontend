import homeIcon from "../assets/home.png";
import profileIcon from "../assets/profile.png";
import homeActiveIcon from "../assets/home-active.png";
import profileActiveIcon from "../assets/profile-active.png";
import saveFooterIcon from "../assets/save-footer.png";
import saveFooterActiveIcon from "../assets/save-footer-active.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";

const Footer = () => {
  let location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated && (
      <>
        <div className="footer d-flex justify-content-between position-fixed bottom-0 start-0 col-md-12">
          <div className="home-icon-footer text-center p-2 col-4">
            <Link to="/">
              <img
                src={location.pathname === "/" ? homeActiveIcon : homeIcon}
                alt="home"
              />
            </Link>
          </div>
          <div className="home-icon-footer text-center p-2 col-4">
            <Link to="/bookmarks">
              <img
                src={
                  location.pathname === "/bookmarks"
                    ? saveFooterActiveIcon
                    : saveFooterIcon
                }
                alt="home"
              />
            </Link>
          </div>
          <div className="profile-icon-footer text-center p-2 col-4">
            <Link to="/profile">
              <img
                src={
                  location.pathname === "/profile"
                    ? profileActiveIcon
                    : profileIcon
                }
                alt="profile"
              />
            </Link>
          </div>
        </div>
      </>
    )
  );
};

export default Footer;
