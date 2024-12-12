import { useEffect, useRef, useState } from "react";
import "../css/style.css"; // Ensure this is the correct path
import "../css/EditProf.css"; // Ensure this is the correct path
import Navbar from "../components/Navbar";
import Headeruser from "../components/Headeruser";
import { useAuth } from "../AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function Resume() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    resume: null,
    name: "",
    bio: "",
    address: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    phone_number: "",
    email: "",
    work_type: "",
    position: "",
  });

  useEffect(() => {
    if (user?.data) {
      setProfileData((prevData) => ({
        ...prevData,
        name: user.data.user_name,
        bio: user.data.bio,
        address: user.data.user_address,
        linkedin: user.data.linkedin,
        twitter: user.data.twitter,
        instagram: user.data.instagram,
        phone_number: user.data.phone_number,
        email: user.data.email,
        work_type: user.data.type_of_work,
        position: user.data.position,
      }));
    }
  }, [user]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    console.log(profileData);
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const formData = new FormData();
  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  const handleProfileSubmit = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/profile`, formData, {
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
        text: "Failed to update profile",
      });
    }
  };

  // State to store the uploaded resume
  // const [resume, setResume] = useState(null);

  // // Function to handle file upload
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setResume(file);
  //   }
  // };

  return (
    <div>
      {/* NavbarUser and HeaderUser should be rendered correctly */}
      <Navbar />
      <Headeruser />

      <div className="containerEditProfileup2">
        <div className="containerEdit1">
          <div className="">
            <h3>Resume</h3>
            <div className="divider"></div>
            <div className="form-grid-avril">
              <div className="form-group">
                <h3>Email</h3>
                <input type="text" placeholder="Enter your Email" name="email" value={profileData.email} onChange={handleInputChange} />
                <h3>Resume</h3>

                {/* File upload button */}
                <input ref={fileInputRef} type="file" name="resume" onChange={handleFileChange} id="resume-upload" style={{ display: "none" }} />
                <label htmlFor="resume-upload">
                  <button className="btnSecondary" style={{ marginTop: "10px" }} onClick={handleClick}>
                    Upload Resume
                  </button>
                </label>

                {/* Display selected file name */}
                {user?.data?.file_resume && <p>File selected: {user?.data?.file_resume}</p>}
              </div>
            </div>

            {/* Save Profile Button */}
            <button className="buttonSave" onClick={handleProfileSubmit}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
