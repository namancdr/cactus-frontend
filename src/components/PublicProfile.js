import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import ContentLoading from "./ContentLoading";
import DefaultProfilePic from "../assets/default-profile.png";
import { useUser } from "../context/user/userContext";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";

const PublicProfile = () => {
  const { fetchOtherUserDetails, user, posts, followUser, unfollowUser } =
    useUser();
  const { user: authUser, getUser } = useAuth();
  const { pathname } = useLocation();
  const username = pathname.split("/").pop();
  const [loading, setLoading] = useState(user ? false : true);
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);

  const initPublicPostCard = async () => {
    setLoading(true);
    await Promise.all([getUser(), fetchOtherUserDetails(username)]);
    setAlreadyFollowed(user?.followers.includes(authUser._id));
    // console.log(user, authUser)
    setLoading(false);
  };

  useEffect(() => {
    initPublicPostCard();
    // eslint-disable-next-line
  }, [user && user.followers.length]);

  const capitaliseText = (text) => {
    const str = text;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  };

  const handleFollow = async () => {
    try {
      setLoading(true);
      if (alreadyFollowed) {
        await unfollowUser(user._id);
      } else {
        await followUser(user._id);
        console.log("Followed");
      }
      fetchOtherUserDetails(username);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  let profileContent, postsContent;
  if (user) {
    profileContent = (
      <div className="container profile-section d-flex align-items-center flex-column">
        <div className="text-center">
          <img
            src={user?.image ?? DefaultProfilePic}
            className="profile-pic img-fluid"
            alt="profile"
          />
          <div className="text-center mt-2" style={{ lineHeight: "0" }}>
            <h5>{user?.name && capitaliseText(user?.name)}</h5>
            <span className="text-muted small">@{user?.username}</span>
          </div>
        </div>

        <div className="profile-info mt-4 row d-flex align-items-center">
          <div className="text-center col lh-half">
            <span className="h5">{posts.length}</span>
            <br />
            <span className="small text-muted">Posts</span>
          </div>
          <div className="text-center col lh-half">
            <span className="h5">{user.followers.length}</span>
            <br />
            <span className="small text-muted">Followers</span>
          </div>
          <div className="text-center col lh-half">
            <span className="h5">{user.following.length}</span>
            <br />
            <span className="small text-muted">Following</span>
          </div>
        </div>
        <div className="d-grid follow-btn-container col-11 my-4">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleFollow}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : alreadyFollowed ? (
              "Following"
            ) : (
              "Follow"
            )}
          </button>
        </div>
      </div>
    );
  } else {
    profileContent = (
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    );
  }

  if (posts) {
    postsContent = posts
      .slice()
      .reverse()
      .map((post) => {
        return <PostCard key={post._id} post={post} />;
      });
  } else {
    postsContent = <ContentLoading />;
  }

  return (
    <div className="component-style">
      {/* Profile */}

      {profileContent}

      {/* Post section */}
      <div className="mid-heading-text mt-4 max-width container">
        <h5>Posts from {user?.name} </h5>
        <hr />
        <span className="text-muted">
          {posts?.length === 0 && "You have not posted anything yet!"}
        </span>
      </div>

      {postsContent}
    </div>
  );
};

export default PublicProfile;
