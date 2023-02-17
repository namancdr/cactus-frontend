import { createContext, useContext, useState } from "react";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const postContext = createContext()

export const usePost = () => {
    return useContext(postContext)
}

export const PostProvider = ({children}) => {
    const host = process.env.REACT_APP_HOST

    const [posts, setPosts] = useState()
    const [comments, setComments] = useState()
    const [usersPost, setUsersPost] = useState()
    const [bookmarks, setBookmarks] = useState()

    const fetchAllPosts = async() => {
        try {
                
            const response = await fetch(`${host}/api/post/fetchallposts`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
                }
            })
            const json = await response.json()
            setPosts(json)
            // console.log(json)

        } catch (error) {
            toast(error, {theme: "dark"})

        }
    }

    const createPost = async(image, imagePath, textData) => {
        const response = await fetch(`${host}/api/post/addpost`, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({image, imagePath, textData})
        });
        const json = await response.json()
        toast(json.success, {theme: "dark"})

        
        if(json.error){
            toast(json.error, {theme: "dark"})
        }
    }

    const fetchUsersPosts = async () => {
        const response = await fetch(`${host}/api/post/fetchusersposts`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json()
        setUsersPost(json)
        toast(json.success, {theme: "dark"})
    }

    const deletePost = async (id) => {
        const response = await fetch(`${host}/api/post/deletepost/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json()

        const newPosts = usersPost.filter((post) => {return post._id !== id})
        setUsersPost(newPosts)
        toast(json.success, {theme: "dark"})
    }

    const editPost = async(id, textData) => {
        const response = await fetch(`${host}/api/post/editpost/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({textData})
        });

        const json = await response.json()

        toast(json.success, {theme: "dark"})

        if(json.error){
            toast(json.error, {theme: "dark"})
        }
    }

    const likePost = async(id) => {

        const response = await fetch(`${host}/api/post/likepost/${id}`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        if(json.success === true){
            console.log('liked the post successfully')
        }else{
            console.error(json.error)
        }
    }

    const unlikePost = async(id) => {
        const response = await fetch(`${host}/api/post/unlikepost/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json()
        if(json.success === true){
            console.log('successfully dis-liked the post')

        }else{
            console.error(json.error)
        }
    }

    // Comment section

    const fetchAllComments = async() => {
        try {
            const response = await fetch(`${host}/api/comment/fetchallcomments`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                }
            })
            const json = await response.json()
            setComments(json)
        } catch (error) {
            toast(error, {theme: "dark"})
        }
    }

    const createComment = async(post, commentText) => {
        const response = await fetch(`${host}/api/comment/${post}/createcomment`, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({commentText})
        });
        const json = await response.json()
        toast(json.success, {theme: "dark"})
        
        if(json.error){
            toast(json.error, {theme: "dark"})
        }
    }

    const bookmarkPost = async(id) => {
        const response = await fetch(`${host}/api/post/bookmarkpost/${id}`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        toast(json.success, {theme: "dark"})

        if(json.error){
            toast(json.error, {theme: "dark"})
        }
    }

    const deleteBookmark = async(id) => {
        const response = await fetch(`${host}/api/post/deletebookmark/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json()
        toast(json.success, {theme: "dark"})

        if(json.error){
            toast(json.error, {theme: "dark"})
        }
    }

    const fetchBookmarks = async(id) => {
        try {
            const response = await fetch(`${host}/api/post/fetchbookmarks`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                }
            })
            const json = await response.json()
            setBookmarks(json)
        } catch (error) {
            toast(error, {theme: "dark"})
        }
    }
    
    const value={
        fetchAllPosts,
        posts,
        createPost,
        fetchUsersPosts,
        usersPost,
        deletePost,
        editPost,
        likePost,
        unlikePost,
        fetchAllComments,
        comments,
        createComment,
        bookmarkPost,
        deleteBookmark,
        fetchBookmarks,
        bookmarks
    }

    return(
        <postContext.Provider value={value}>
            {children}
        </postContext.Provider>
    )


}



