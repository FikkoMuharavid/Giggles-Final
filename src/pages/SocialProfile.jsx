import { useEffect, useState } from "react";
import "/src/css/style.css";

import "/src/css/EditProf.css";
import Navbar from "/src/components/Navbar"; // Impor NavbarUser
import Headeruser from "/src/components/Headeruser";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../AuthContext";

function SocialProfile() {
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
    profile: null,
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

  // Close dropdown when clicking outside
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

      {/* New Social Profile Section */}
      <div className="containerEditProfileup22">
        <div className="containerEdit3">
          <div className="new-profile">
            <h3>Social Profile</h3>
            <div className="divider"></div>
            <br />
            <div className="form-grid-avril">
              <div className="form-group">
                <h3>Phone Number</h3>
                <input type="text" placeholder="Enter your Phone Number" className="inputField" name="phone_number" value={profileData.phone_number} onChange={handleInputChange} />
                <h3>LinkedIn</h3>
                <input type="text" placeholder="Enter your LinkedIn profile" className="inputField" name="linkedin" value={profileData.linkedin} onChange={handleInputChange} />
                <h3>Twitter</h3>
                <input type="text" placeholder="Enter your Twitter handle" className="inputField" name="twitter" value={profileData.twitter} onChange={handleInputChange} />
                <h3>Instagram</h3>
                <input type="text" placeholder="Enter your Instagram profile" className="inputField" name="instagram" value={profileData.instagram} onChange={handleInputChange} />
              </div>
            </div>
            <button className="buttonSave" onClick={handleProfileSubmit}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialProfile;
