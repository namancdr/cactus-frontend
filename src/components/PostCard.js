import { useEffect, useState } from 'react'
import likeIcon from '../assets/like.png'
import commentIcon from '../assets/comment.png'
import likedIcon from '../assets/liked.png'
import shareIcon from '../assets/share.png'
import saveIcon from '../assets/save-icon.png'
import savedIcon from '../assets/saved-icon.png'
import { usePost } from '../context/post/postContext'
import { useAuth } from "../context/auth/authContext"
import Comment from './Comment'



const PostCard = (props) => {

    const {post} = props
    const {likePost, unlikePost, fetchAllPosts, bookmarkPost, deleteBookmark, comments, fetchAllComments} = usePost()
    const {user} = useAuth()
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false)
    const [commentVisibility, setCommentVisibility] = useState(false)
    
    useEffect(() => {
      fetchAllComments()
      const operations = async() => {
        try {
          await fetchAllPosts()
          setLikes(post.likes.length)
          setLiked(post.likes.includes(user._id))
        } catch (error) {
          console.error(error)
        }
      }
      
      user && setSaved(user.bookmarkedPosts.includes(post._id)) 

      operations()
      // eslint-disable-next-line
    }, [likes])

    // Like handling /////////////////////////////////////////////////////////////////
    const handleLike = async() => {
      try {
        if (liked) {
          await unlikePost(post._id)
          setLiked(false)
          setLikes(likes - 1);
        } else {
          await likePost(post._id)
          setLiked(true)
          setLikes(likes + 1)
        }
      } catch (error) {
        console.error(error);
      }
    }

    const handleCommentBtn = () => {
      setCommentVisibility(!commentVisibility)
    }

    const handleShare = () => {
      alert('share')
    }

    // Bookmark Post handling //////////////////////////////////////////////////////
    const handleSave = async() => {
      try {
        if(saved){
          await deleteBookmark(post._id)
          setSaved(false)
        } else{
          await bookmarkPost(post._id)
          setSaved(true)
        }
      } catch (error) {
        console.error(error);
      }
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
        

  const filteredComments = comments && comments.filter((comment) => comment.post._id === post._id)

    return(
        <>
        <div className="container post-card d-flex flex-column justify-content-center mt-2">
          
            <div className="post-header d-flex align-items-center mt-2">
                <div className="post-profile-pic-container">
                    <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg' className="post-profile-pic img-fluid" alt="profile" />
                </div>
                <div className="mx-3" style={{lineHeight: "1.1"}}>
                    <span style={{fontSize: "16px"}}>{post.user.name}</span><br />
                    <span style={{fontSize: "12px"}} className="small">{timeSince(post.date) + " ago"}</span>
                </div>
            </div>
            {post.image && <div className="post-img mt-2">
                 <img src={post.image} className="img-fluid" alt="post" /> 
            </div>
            }
            <div className="post-text">
                <p className='mt-3'>{post.textData}</p>
            </div>

            {/* Post engagement */}
            <div className="post-engagement">
                <div className="d-flex justify-content-between">
                  <div>
                    <img className='me-2' src={liked ? likedIcon : likeIcon} alt="like" onClick={handleLike} />
                    <img className='mx-2' src={commentIcon} alt="comment" onClick={handleCommentBtn} />
                    <img className='mx-2' src={shareIcon} alt="share" onClick={handleShare} />
                  </div>

                  <div>
                    <img className='mx-2' src={saved ? savedIcon : saveIcon} alt="share" onClick={handleSave} />
                  </div>
                    
                </div>
                <div className="d-flex mt-2">
                    <p className='small'>{post.likes.length} <span className='text-muted'>likes</span> &nbsp;&nbsp; • &nbsp;&nbsp; {filteredComments && filteredComments.length} <span className='text-muted'>comments</span></p>
                </div>
            </div>

            {/* Comment section */}
            {commentVisibility ? <Comment post={post} /> : null}
        </div>
        </>
    )
}

export default PostCard