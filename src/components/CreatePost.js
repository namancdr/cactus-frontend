import { useState } from "react";
import { usePost } from "../context/post/postContext";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const CreatePost = () => {
  const { createPost } = usePost();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    postData: "",
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (imageUpload) {
      const imagePath = `images/${imageUpload.name + v4()}`;
      const imageRef = ref(storage, imagePath);
      await uploadBytes(imageRef, imageUpload).then(() => {
        console.log("image uploaded");
      });

      const image = await getDownloadURL(imageRef).then((url) => {
        return url;
      });

      if (image) createPost(image, imagePath, postData.textData);
    }

    if (imageUpload === null) {
      createPost("", "", postData.textData);
    }
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <h2>Create Post</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
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
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Caption
          </label>
          <textarea
            type="text"
            className="form-control"
            name="textData"
            id="textData"
            onChange={handleChange}
            value={postData.textData}
            placeholder="Enter your thoughts here!"
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
