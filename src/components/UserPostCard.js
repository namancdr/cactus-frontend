import { useEffect, useState } from 'react'
import likeIcon from '../assets/like.png'
import commentIcon from '../assets/comment.png'
import shareIcon from '../assets/share.png'
import likedIcon from '../assets/liked.png'
import {usePost} from '../context/post/postContext'
import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { toast } from 'react-toastify';
import { useAuth } from "../context/auth/authContext"
import Comment from './Comment'
import Modal from 'react-modal';

// Things to do
    // Post profile picture with profile page

const UserPostCard = (props) => {
    
    const {usersPost, username} = props
    const {likePost, unlikePost, fetchUsersPosts, deletePost, editPost} = usePost()
    const {user} = useAuth()
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [commentVisibility, setCommentVisibility] = useState(false)


    // post delete handling
      // deleting image and text seperately as image is stored in firebase
    const deleteRef = ref(storage, usersPost.imagePath)

    const handleDelete = (id) => {

        usersPost.image && deleteObject(deleteRef).then(() => {
            console.log('Post deleted')
        }).catch((error) => {
            toast(error, {theme: "dark"})
        });

        deletePost(id)

    }

// Edit post handling

    // edit post modal style
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    Modal.setAppElement(document.getElementById('root'));
    const [modalIsOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState({id: '',textData: ''})

    const openModal = (currentPost)=> {
      setIsOpen(true);
      setPost({id: currentPost._id , textData: currentPost.textData})
    }

    const closeModal =()=> {
        setIsOpen(false);
    }

    const handleEdit = async(e) => {
      e.preventDefault()
      await editPost(post.id, post.textData)
      fetchUsersPosts()
      closeModal()
    }

    const handleEditChange =(e)=> {
      setPost({...post, [e.target.name]: e.target.value})
  } 

    // Like / unline handing
    
    useEffect(() => {
      const likeOperation = async() => {
        try {
          await fetchUsersPosts()
          setLikes(usersPost.likes.length)
          setLiked(usersPost.likes.includes(user._id))
        } catch (error) {
          console.error(error)
        }
      }

      likeOperation()
      // eslint-disable-next-line
    }, [likes])
  
      
    const handleLike = async() => {
      try {
        if (liked) {
          await unlikePost(usersPost._id)
          setLiked(false)
          setLikes(likes - 1);
        } else {
          await likePost(usersPost._id)
          setLiked(true)
          setLikes(likes + 1)
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Comment handling
    const handleCommentBtn = () => {
      setCommentVisibility(!commentVisibility)
    }

    // share handling
    const handleShare = () => {
      alert('share')
    }

    // function to format date in seconds/minutes/hours/days ago
    const timeSince = (date) => {
    if (typeof date !== 'object') {
      date = new Date(date);
    }

    const seconds = Math.floor((new Date() - date) / 1000);
    let intervalType;

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }

    if (interval > 1 || interval === 0) {
    intervalType += 's'
    }

    return interval + ' ' + intervalType;
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
              <label htmlFor="textData" className="form-label">Caption</label>
              <input type="text" className="form-control" name="textData" id="textData" value={post.textData} onChange={handleEditChange} />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </Modal>

      {/* UserPost Card */}
      <div className="container post-card d-flex flex-column justify-content-center mt-4">  
          <div className="post-header d-flex align-items-center mt-2">
              <div className="post-profile-pic-container">
                  <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg' className="post-profile-pic img-fluid" alt="profile" />
              </div>
              <div className="mx-3" style={{lineHeight: "1.1"}}>
                  <span style={{fontSize: "16px"}}>{username}</span><br />
                  <span style={{fontSize: "12px"}} className="small text-muted">{timeSince(usersPost.date)}</span>
              </div>
              <div className="post-option-btn" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-three-dots-vertical"></i>
              </div>

              <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => {handleDelete(usersPost._id)}}>Delete Post</li>
                  <li className="dropdown-item" onClick={() => {openModal(usersPost)}}>Edit Post</li>
              </ul>

          </div>

          {usersPost.image && <div className="post-img mt-3">
                <img src={usersPost.image} className="img-fluid" alt="post" /> 
          </div>
          }
          <div className="post-text">
              <p className='my-3'>{usersPost.textData}</p>
          </div>
          <div className="post-engagement">
              <div className="d-flex mt-2">
                  <img className='me-2' src={liked ? likedIcon : likeIcon} alt="like" onClick={handleLike} />
                  <img className='mx-2' src={commentIcon} alt="comment" onClick={handleCommentBtn} />
                  <img className='mx-2' src={shareIcon} alt="share" onClick={handleShare} />
              </div>
              <div className="d-flex mt-3">
                  <p className='small'>{usersPost.likes.length} <span className='text-muted'>likes</span> &nbsp;&nbsp; • &nbsp;&nbsp; 45 <span className='text-muted'>comments</span></p>
              </div>
          </div>
          {commentVisibility ? <Comment post={usersPost} /> : null}

      </div> <hr />
    </div>
  )
}

export default UserPostCard