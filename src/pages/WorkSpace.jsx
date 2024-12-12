import { useEffect, useState } from "react";
import "/src/css/style.css";
import "/src/css/EditProf.css";
import Navbar from "/src/components/Navbar"; // Impor NavbarUser
import Headeruser from "/src/components/Headeruser.jsx";
import { useAuth } from "../AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function WorkSpace() {
  const { user } = useAuth();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    console.log(profileData);
  };

  const handleWorkPrefChange = (e) => {
    const workPref = e.target.value;
    setProfileData({ ...profileData, work_type: workPref });
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const dropdown = document.getElementById("dropdownMenu");
      if (dropdown && dropdown.style.display === "block" && !event.target.matches(".profile-icon")) {
        dropdown.style.display = "none";
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      {/* Call NavbarUser component */}
      <Navbar />

      {/* Call HeaderUser component */}
      <Headeruser />
      {/* Work Preferences Section */}
      <div className="containerEditProfileup3">
        <div className="containerEdit2">
          <h3>Work Preferences</h3>
          <div className="divider"></div>
          <div className="form-grid-avril">
            <div className="form-group">
              <h3>Freelance</h3>
              <div className="options-group">
                <label className="custom-radio">
                  <input type="radio" name="work_type" value="freelance" checked={profileData.work_type === "freelance"} onChange={handleWorkPrefChange} />
                  <span className="label-text">Freelance</span>
                  <span className="radio-circle"></span>
                </label>
                <label className="custom-radio">
                  <input type="radio" name="work_type" value="fulltime" checked={profileData.work_type === "fulltime"} onChange={handleWorkPrefChange} />
                  <span className="label-text">Full Time</span>
                  <span className="radio-circle"></span>
                </label>
              </div>
              <h3>Position</h3>
              <input type="text" placeholder="Upload or link your resume" name="position" value={profileData.position} onChange={handleInputChange} />
            </div>
          </div>
          <button className="buttonSave" onClick={handleProfileSubmit}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
