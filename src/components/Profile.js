import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/authContext";
import { usePost } from "../context/post/postContext";
import PostCard from "./PostCard";
import ContentLoading from "./ContentLoading";
import DefaultProfilePic from "../assets/default-profile.png";
import Modal from "react-modal";
import pictureIcon from "../assets/picture-icon.png";
import trashIcon from "../assets/trash-icon.png";
import { v4 } from "uuid";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useUser } from "../context/user/userContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, getUser } = useAuth();
  const { fetchUsersPosts, usersPost } = usePost();
  const { uploadProfilePic, deleteProfilePic } = useUser();
  const [formVisiblity, setFormVisiblity] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
    fetchUsersPosts();

    // eslint-disable-next-line
  }, []);

  const [imageUpload, setImageUpload] = useState(null);
  const deleteRef = ref(storage, user.imagePath);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Delete the old profile picture from firebase
    if (user.image && user.imagePath) {
      deleteObject(deleteRef)
        .then(() => {
          console.log("Old profile picture deleted");
        })
        .catch((error) => {
          toast(error, { theme: "dark" });
        });
    }

    // Upload new profile picture to firebase
    if (imageUpload) {
      const imagePath = `profilepic/${imageUpload.name + v4()}`;
      const imageRef = ref(storage, imagePath);
      await uploadBytes(imageRef, imageUpload).then(() => {
        console.log("image uploaded");
      });

      const image = await getDownloadURL(imageRef).then((url) => {
        return url;
      });

      if (image) await uploadProfilePic(image, imagePath);
      setLoading(false);
      getUser();
      fetchUsersPosts();
      closeModal();
    }
  };

  const handleProfilePicDelete = async () => {
    setLoading(true);
    user.image &&
      deleteObject(deleteRef)
        .then(() => {
          console.log("Profile Picture deleted");
        })
        .catch((error) => {
          toast(error, { theme: "dark" });
        });

    await deleteProfilePic();
    closeModal();
    getUser();
    setLoading(false);
  };

  const capitaliseText = (text) => {
    const str = text;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#0B0A0D",
      maxHeight: "400px",
      maxWidth: "350px",
      width: "330px",
    },
  };

  Modal.setAppElement(document.getElementById("root"));
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (currentPost) => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="component-style">
      <div className="modal-container">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Edit Note Modal"
          overlayClassName="modal-overlay"
        >
          <div>
            <p onClick={() => setFormVisiblity(!formVisiblity)}>
              <img src={pictureIcon} alt="" />
              {formVisiblity ? " Cancel" : " New profile picture"}
            </p>
            {user.image ? (
              <p onClick={handleProfilePicDelete}>
                <img src={trashIcon} alt="" /> Delete current picture
              </p>
            ) : null}
          </div>
          {formVisiblity ? (
            <form className="my-4" onSubmit={handleSubmit}>
              <input
                type="file"
                className="form-control"
                id="exampleInputImage1"
                name="image"
                aria-describedby="imageHelp"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <div className="d-grid">
                <button
                  className={`btn btn-primary ${
                    imageUpload ? "" : "disabled"
                  } mt-2`}
                  type="submit"
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </form>
          ) : null}
          <button className="btn btn-danger" onClick={closeModal}>
            close
          </button>
        </Modal>
      </div>

      {/* Profile */}
      {user && usersPost ? (
        <div
          className="container profile-section d-flex align-items-center justify-content-center flex-column"
          style={{ marginTop: "70px" }}
        >
          <div className="">
            <img
              src={user.image ? user.image : DefaultProfilePic}
              className="profile-pic img-fluid"
              alt="profile"
              onClick={openModal}
            />
            <div className="text-center mt-2" style={{ lineHeight: "0" }}>
              <h5>{user.name && capitaliseText(user.name)}</h5>
              <span className="text-muted small">@{user.username}</span>
            </div>
          </div>

          <div className="profile-info mt-4 row d-flex align-items-center">
            <div className="text-center col lh-half">
              <span className="h5">{usersPost.length}</span>
              <br />
              <span className="small text-muted">Posts</span>
            </div>
            <div className="text-center col lh-half">
              <span className="h5">{user?.followers.length}</span>
              <br />
              <span className="small text-muted">Followers</span>
            </div>
            <div className="text-center col lh-half">
              <span className="h5">{user?.following.length}</span>
              <br />
              <span className="small text-muted">Following</span>
            </div>
          </div>
        </div>
      ) : (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
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
