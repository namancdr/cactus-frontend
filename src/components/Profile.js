import { useEffect } from "react";
import { useAuth } from "../context/auth/authContext";
import { usePost } from "../context/post/postContext";
import PostCard from "./PostCard";
import ContentLoading from "./ContentLoading";

const Profile = (props) => {
  const { user, getUser } = useAuth();
  const { fetchUsersPosts, usersPost } = usePost();

  useEffect(() => {
    getUser();
    fetchUsersPosts();

    // eslint-disable-next-line
  }, []);

  const capitaliseText = (text) => {
    const str = text;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  };
  return (
    <div className="component-style">
      {/* Profile */}
      {user && (
        <div
          className="container profile-section d-flex align-items-center justify-content-center flex-column"
          style={{ marginTop: "70px" }}
        >
          <div className="">
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
              className="profile-pic img-fluid"
              alt="profile"
            />
            <div className="text-center mt-2" style={{ lineHeight: "1.1" }}>
              <span className="text-muted small">@{user.username}</span>
              <h5>{user.name && capitaliseText(user.name)}</h5>
            </div>
          </div>
        </div>
      )}

      {/* Post section */}
      <div className=" mid-heading-text mt-4 container">
        <h5>Your Posts</h5>
        <hr />
        <span className="text-muted">
          {usersPost &&
            usersPost.length === 0 &&
            "You have not posted anything yet!"}
        </span>
      </div>
      {/* {usersPost ? usersPost.slice().reverse().map((post) => {
          return <UserPostCard key={post._id} usersPost={post} username={user.username} />
        }):  <ContentLoading />} */}

      {usersPost ? (
        usersPost
          .slice()
          .reverse()
          .map((post) => {
            return <PostCard key={post._id} post={post} showOptions={true} />;
          })
      ) : (
        <ContentLoading />
      )}
    </div>
  );
};

export default Profile;
