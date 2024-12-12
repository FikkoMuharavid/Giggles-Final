import { useState } from "react";
import HeaderEditCompany from "../components/HeaderEditCompany";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

function CompanyEditPostJob() {
  const [imageData, setImageData] = useState({
    image: "",
    position: "",
    description: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImageData({ ...imageData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageData({ ...imageData, image: e.target.files[0] });
  };

  const formData = new FormData();
  formData.append("position", imageData.position);
  formData.append("description", imageData.description);
  formData.append("category", imageData.category);
  formData.append("image", imageData.image);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/company/job`, formData, {
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
    <>
      <Navbar />
      <div className="company2">
        <HeaderEditCompany />
        <div className="containerEditPost">
          <div className="containerEdit">
            <div className="tittle">Post a Job</div>
            <hr
              style={{
                marginTop: "13px",
                borderWidth: "2px",
                boxShadow: "0px 0px 4px 0px rgba(255, 255, 255, 0.25)",
              }}
            />

            <div className="form" style={{ marginTop: "30px" }}>
              <h3>Position</h3>
              <input type="text" name="position" value={formData.position} onChange={handleInputChange} style={{ width: "95%" }} placeholder="Type here..." />
            </div>

            <div className="form" style={{ marginTop: "20px" }}>
              <h3>Category</h3>
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} style={{ width: "95%" }} placeholder="Type here..." />
            </div>

            <div className="form" style={{ marginTop: "20px" }}>
              <h3>Description</h3>
              <input type="text" name="description" value={formData.description} onChange={handleInputChange} style={{ width: "95%" }} placeholder="Type here..." />
            </div>

            <div className="form" style={{ marginTop: "20px" }}>
              <h3>Photo</h3>
              <input type="file" name="imagePost" onChange={handleFileChange} />
            </div>

            <style>{`
            .containerCategory {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
            }

            .tag {
              display: flex;
              align-items: center;
              padding: 10px 15px;
              border-radius: 10px;
              border: 1px solid #fff;
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .tag.active {
              background-color: #fff;
              color: #333;
            }

            .tag:hover {
              background-color: #f5f5f5;
            }

            .input-containerCategory {
              flex-grow: 1;
              margin-left: 10px;
            }

            .input-containerCategory input {
              width: 100%;
              padding: 10px;
              border-radius: 10px;
              border: 1px solid #fff;
            }
          `}</style>
            <button className="buttonSave" onClick={handleSubmit}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default CompanyEditPostJob;
