const hostUrl = process.env.REACT_APP_HOST;

const useFetch = () => {
  const sendRequest = async (url, method, body, isAuthenticated = false) => {
    const options = {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (isAuthenticated) {
      options.headers["auth-token"] = localStorage.getItem("token");
    }
    const response = await fetch(hostUrl + url, options);
    const json = await response.json();
    return json;
  };

  const fetchAllPostsAPI = async () => {
    const response = await sendRequest(
      "/api/post/fetchallposts",
      "GET",
      null,
      true
    );
    return response;
  };

  const createPostAPI = async (image, imagePath, textData) => {
    const response = await sendRequest(
      "/api/post/addpost",
      "POST",
      JSON.stringify({ image, imagePath, textData }),
      true
    );
    return response;
  };

  const editpostAPI = async (id, textData) => {
    const response = await sendRequest(
      `/api/post/editpost/${id}`,
      "PUT",
      JSON.stringify({ textData }),
      true
    );
    return response;
  };

  const fetchUsersPostsAPI = async () => {
    const response = await sendRequest(
      "/api/post/fetchusersposts",
      "GET",
      null,
      true
    );
    return response;
  };

  const deletePostAPI = async (id) => {
    const response = await sendRequest(
      `/api/post/deletepost/${id}`,
      "DELETE",
      null,
      true
    );

    return response;
  };

  const likePostAPI = async (id) => {
    const response = await sendRequest(
      `/api/post/likepost/${id}`,
      "POST",
      null,
      true
    );

    return response;
  };

  const unlikePostAPI = async (id) => {
    const response = await sendRequest(
      `/api/post/unlikepost/${id}`,
      "DELETE",
      null,
      true
    );

    return response;
  };

  const fetchAllCommentsAPI = async () => {
    const response = await sendRequest(
      `/api/comment/fetchallcomments`,
      "GET",
      null,
      true
    );

    return response;
  };

  const createCommentAPI = async (post, commentText) => {
    const response = await sendRequest(
      `/api/comment/${post}/createcomment`,
      "POST",
      JSON.stringify({ commentText }),
      true
    );
    return response;
  };

  const bookmarkPostAPI = async (id) => {
    const response = await sendRequest(
      `/api/post/bookmarkpost/${id}`,
      "POST",
      null,
      true
    );

    return response;
  };

  const deleteBookmarkAPI = async (id) => {
    const response = await sendRequest(
      `/api/post/deletebookmark/${id}`,
      "DELETE",
      null,
      true
    );

    return response;
  };

  const fetchBookmarksAPI = async (id) => {
    const response = await sendRequest(
      `/api/post/fetchbookmarks`,
      "GET",
      null,
      true
    );

    return response;
  };

  // Auth APIs

  const createUserAPI = async ({name, username, email, password}) => {
    const response = await sendRequest(
      `/api/auth/createuser`,
      "POST",
      JSON.stringify({name, username, email, password}),
      true
    );
    return response;
  };

  
  const loginUserAPI = async ({email, password}) => {
    const response = await sendRequest(
      `/api/auth/login`,
      "POST",
      JSON.stringify({email, password}),
      true
    );
    return response;
  };

  
  const getUserAPI = async () => {
    const response = await sendRequest(
      `/api/auth/getuser`,
      "POST",
      null,
      true
    );
    return response;
  };

  return {
    fetchAllPostsAPI,
    createPostAPI,
    fetchUsersPostsAPI,
    deletePostAPI,
    editpostAPI,
    likePostAPI,
    unlikePostAPI,
    fetchAllCommentsAPI,
    createCommentAPI,
    bookmarkPostAPI,
    deleteBookmarkAPI,
    fetchBookmarksAPI,
    createUserAPI,
    loginUserAPI,
    getUserAPI
  };
};

export default useFetch;
