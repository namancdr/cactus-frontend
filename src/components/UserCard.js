import DefaultProfilePic from "../assets/default-profile.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";

const UserCard = (props) => {
  const { user } = useAuth();
  const { image, name, username } = props.user;
  return (
    <div className="mt-4">
      <Link
        to={props.user._id === user._id ? "/profile" : `/user/${username}`}
        style={{ textDecoration: "none" }}
      >
        <div className="search d-flex align-items-center">
          <div className="post-profile-pic-container">
            <img
              src={image ? image : DefaultProfilePic}
              className="post-profile-pic img-fluid"
              alt="profile"
            />
          </div>
          <div className="mx-3" style={{ lineHeight: "1.1" }}>
            <span style={{ fontSize: "16px" }}>{username}</span>
            <br />
            <span style={{ fontSize: "12px" }} className="small text-muted">
              {name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
