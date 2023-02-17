import React, { useEffect } from 'react'
import { usePost } from '../context/post/postContext'
// import { useAuth } from '../context/auth/authContext'
// import PostCard from './PostCard'
// import ContentLoading from './ContentLoading'

const Bookmarks = () => {

    const {fetchBookmarks, bookmarks} = usePost()
    useEffect(() => {
      fetchBookmarks()

      // eslint-disable-next-line
    }, [])
    
    console.log(bookmarks)

  return (
    <div style={{marginTop: "60px", marginBottom: "80px"}}>
        <h2>bookmarks</h2>
    </div>
  )
}

export default Bookmarks