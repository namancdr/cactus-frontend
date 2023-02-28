import { useEffect, useState, useCallback } from "react";
import likeIcon from "../assets/like.png";
import commentIcon from "../assets/comment.png";
import likedIcon from "../assets/liked.png";
import saveIcon from "../assets/save-icon.png";
import savedIcon from "../assets/saved-icon.png";
import timeSince from "../utils/timeSince";
import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth/authContext";
import { usePost } from "../context/post/postContext";
import Modal from "react-modal";
import Comment from "./Comment";
import DefaultProfilePic from '../assets/default-profile.png'

const PostCard = (props) => {
  const { post, showOptions } = props;
  const {
    likePost,
    unlikePost,
    fetchAllPosts,
    fetchUsersPosts,
    fetchAllComments,
    fetchBookmarks,
    bookmarkPost,
    deleteBookmark,
    comments,
    deletePost,
    editPost,
  } = usePost();
  const { user } = useAuth();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentVisibility, setCommentVisibility] = useState(false);
  const [saved, setSaved] = useState(false);

  const initPostCard = useCallback(async () => {
    if (user && post) {
      try {
        await fetchAllPosts();
        await fetchUsersPosts();
        setLikes(post.likes.length);
        setLiked(post.likes.includes(user._id));
      } catch (error) {
        console.error(error);
      }
    }
  }, [likes]); // eslint-disable-line

  useEffect(() => {
    if (user) setSaved(user.bookmarkedPosts?.includes(post._id));
    initPostCard();
    // eslint-disable-next-line
  }, [likes]);

  useEffect(() => {
    fetchAllComments();
  }, []); // eslint-disable-line

  // Like handling /////////////////////////////////////////////////////////////////
  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost(post._id);
        setLiked(false);
        setLikes(likes - 1);
      } else {
        await likePost(post._id);
        setLiked(true);
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   handle comment visibility
  const handleCommentBtn = () => {
    setCommentVisibility(!commentVisibility);
  };

  const filteredComments =
    comments && comments.filter((comment) => comment.post._id === post._id);

  // Post delete handling
  // deleting image and text seperately as image is stored in firebase
  const deleteRef = ref(storage, post.imagePath);

  const handleDelete = (id) => {
    post.image &&
      deleteObject(deleteRef)
        .then(() => {
          console.log("Post deleted");
        })
        .catch((error) => {
          toast(error, { theme: "dark" });
        });

    deletePost(id);
  };

  // Bookmark Post handling //////////////////////////////////////////////////////
  const handleSave = async () => {
    try {
      if (saved) {
        await deleteBookmark(post._id);
        setSaved(false);
      } else {
        await bookmarkPost(post._id);
        setSaved(true);
      }
      fetchBookmarks();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit post handling

  // edit post modal style
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement(document.getElementById("root"));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newPostData, setNewPostData] = useState({ id: "", textData: "" });

  const openModal = (currentPost) => {
    setIsOpen(true);
    setNewPostData({ id: currentPost._id, textData: currentPost.textData });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await editPost(newPostData._id, newPostData.textData);
    fetchUsersPosts();
    closeModal();
  };

  const handleEditChange = (e) => {
    setNewPostData({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Edit post Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Note Modal"
      >
        <form className="my-4" onSubmit={handleEdit}>
          <h2>Edit Post</h2>
          <div className="mb-3">
            <label htmlFor="textData" className="form-label">
              Caption
            </label>
            <input
              type="text"
              className="form-control"
              name="textData"
              id="textData"
              value={newPostData.textData}
              onChange={handleEditChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </Modal>
      <div className="container post-card d-flex flex-column justify-content-center mt-2">
        <div className="post-header d-flex align-items-center mt-2">
          <div className="post-profile-pic-container">
            <img
              src={post.user.image ? post.user.image : DefaultProfilePic}
              className="post-profile-pic img-fluid"
              alt="profile"
            />
          </div>
          <div className="mx-3" style={{ lineHeight: "1.1" }}>
            <span style={{ fontSize: "16px" }}>
              {post.user.name || user.username}
            </span>
            <br />
            <span style={{ fontSize: "12px" }} className="small text-muted">
              {timeSince(post.date) + " ago"}
            </span>
          </div>

          {showOptions ? (
            <>
              <div
                className="post-option-btn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </div>
              <ul className="dropdown-menu">
                <li
                  className="dropdown-item"
                  onClick={() => {
                    handleDelete(post._id);
                  }}
                >
                  Delete Post
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    openModal(post);
                  }}
                >
                  Edit Post
                </li>
              </ul>
            </>
          ) : null}
        </div>

        {post.image && (
          <div className="post-img mt-3">
            <img src={post.image} className="img-fluid" alt="post" />
          </div>
        )}
        <div className="post-text">
          <p className="my-3">{post.textData}</p>
        </div>
        <div className="post-engagement">
          <div className="d-flex justify-content-between">
            <div>
              <img
                className="me-2"
                src={liked ? likedIcon : likeIcon}
                alt="like"
                onClick={handleLike}
              />
              <img
                className="mx-2"
                src={commentIcon}
                alt="comment"
                onClick={handleCommentBtn}
              />
            </div>

            <div>
              <img
                className="mx-2"
                src={saved ? savedIcon : saveIcon}
                // src={saveIcon}
                alt="Save"
                onClick={handleSave}
              />
            </div>
          </div>
          <div className="d-flex mt-2">
            <p className="small">
              {post.likes.length} <span className="text-muted">likes</span>{" "}
              &nbsp;&nbsp; • &nbsp;&nbsp;{" "}
              {filteredComments && filteredComments.length}{" "}
              <span className="text-muted">comments</span>
            </p>
          </div>
        </div>
        {commentVisibility ? <Comment post={post} /> : null}
        <hr />
      </div>
    </div>
  );
};

export default PostCard;
