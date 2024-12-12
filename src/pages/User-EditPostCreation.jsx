import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/User-PostCreation.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function PostCreation() {
  const id = useParams().id;
  const [imageData, setImageData] = useState({
    // image: "",
    title: "",
    description: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImageData({ ...imageData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   setImageData({ ...imageData, image: e.target.files[0] });
  // };

  const formData = new FormData();
  formData.append("title", imageData.title);
  formData.append("description", imageData.description);
  formData.append("category", imageData.category);
  // formData.append("image", imageData.image);

  const getPostData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      setImageData({
        // image: response.data.data.image_post,
        title: response.data.data.title,
        description: response.data.data.description,
        category: response.data.data.category,
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/gallery/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
    } catch (error) {
      console.error("Error uploading post:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upload post",
      });
    }
  };

  return (
    <div className="postcreationpage">
      <Navbar />
      <div className="postcreation">
        <div className="tittle">Edit Post</div>
        <hr
          style={{
            marginTop: "13px",
            border: "2px solid white",
            boxShadow: "0px 0px 4px 0px rgba(255, 255, 255, 0.25)",
          }}
        />
        <div className="form" style={{ marginTop: "30px" }}>
          <h3>Title</h3>
          <input type="text" name="title" value={imageData.title} onChange={handleInputChange} style={{ width: "95%" }} placeholder="Type here..." />
        </div>
        <div className="form" style={{ marginTop: "20px" }}>
          <h3>Description</h3>
          <input type="text" name="description" value={imageData.description} onChange={handleInputChange} style={{ width: "95%" }} placeholder="Type here..." />
        </div>
        <div className="form" style={{ marginTop: "20px" }}>
          <h3>Category</h3>
          <input type="text" name="category" value={imageData.category} onChange={handleInputChange} style={{ width: "95%" }} placeholder="Type here..." />
        </div>
        <button className="buttonSave" onClick={handleSubmit}>
          Save
        </button>
      </div><br /><br />
      <Footer />
    </div>
  );
}

export default PostCreation;
