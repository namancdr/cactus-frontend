import React, {useState, useEffect} from 'react'
import { usePost } from '../context/post/postContext'

const Comment = (props) => {

  const {post} = props
  const {comments, fetchAllComments, createComment} = usePost()  
  const [commentText, setCommentText] = useState('')
  useEffect(() => {
    fetchAllComments()
        // eslint-disable-next-line
  }, [])
  
  const handleChange = (e) => {
    setCommentText(e.target.value)
  }

  const handleComment = async() => {
      await createComment(post._id, commentText)
      fetchAllComments()
  }

  const filteredComments = comments && comments.filter((comment) => comment.post._id === post._id)
  return (
      <div className="comment-section">
        <div className='d-flex align-items-center justify-content-between comment-form px-3'>
          <input type="text" name="commentInput" placeholder='Add a comment...' className="form-control-sm commentInput" onChange={handleChange} value={commentText} />
          <span onClick={handleComment}>Post</span>
        </div>
        {comments ? filteredComments.map((comment) => {
          return (
            <div key={comment._id}>
              <b>{comment.user.name}</b> <span>{comment.commentText}</span><hr />
            </div>
        )}) : null}
      </div>
  )
}


export default Comment