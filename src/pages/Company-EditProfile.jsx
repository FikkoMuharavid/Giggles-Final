import Navbar from "../components/Navbar";
import HeaderEditCompany from "../components/HeaderEditCompany";
import "../styles/company-editprofile.css";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const EditProfileCompany = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    profile: null,
    name: "",
    email: "",
    address: "",
    location: "",
    phone_number: "",
    website: "",
    headline: "",
    body: "",
    visi: "",
    misi: "",
  });

  useEffect(() => {
    if (user?.data) {
      setProfileData((prevData) => ({
        ...prevData,
        name: user.data.company_name,
        email: user.data.email,
        address: user.data.company_address,
        location: user.data.company_location,
        phone_number: user.data.phone_number,
        website: user.data.website,
        headline: user.data.about_headline,
        body: user.data.about_body,
        visi: user.data.about_visi,
        misi: user.data.about_misi,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    console.log(profileData);
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      profile: e.target.files[0],
    }));
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formData = new FormData();
  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/company/profile`, formData, {
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

  // const getProfileData = async () => {
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/company/profile`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     console.log(response.data);

  //     setProfileData({
  //       profile: response.data.user.company_profile,
  //       name: response.data.user.company_name,
  //       email: response.data.user.email,
  //       address: response.data.user.company_address,
  //       location: response.data.user.company_location,
  //       phone_number: response.data.user.phone_number,
  //       website: response.data.user.website,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   getProfileData();
  // }, []);

  return (
    <>
      <Navbar />
      <div className="company2">
        <HeaderEditCompany />
        <div className="containerEditProfile">
          <div className="containerEdit">
            <div className="changephoto">
              <img src={profileData.profile ? URL.createObjectURL(profileData.profile) : `${user?.data?.company_profile}`} alt="" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%" }} />
              <button style={{ position: "absolute", marginTop: "30px", marginLeft: "50px" }} onClick={handleClick}>
                Change Photo
              </button>
              <input type="file" name="profile" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <h3>Company Name</h3>
                <input type="text" placeholder="Enter your name" name="name" value={profileData.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <h3>Email</h3>
                <input type="text" placeholder="Enter your name" name="email" value={profileData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <h3>Company Address</h3>
                <input type="text" placeholder="Enter your name" name="address" value={profileData.address} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <h3>Phone Number</h3>
                <input type="text" placeholder="Enter your name" name="phone_number" value={profileData.phone_number} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <h3>Location</h3>
                <input type="text" placeholder="Enter your name" name="location" value={profileData.location} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <h3>Website</h3>
                <input type="text" placeholder="Enter your name" name="website" value={profileData.website} onChange={handleInputChange} />
              </div>
              <br />
              <br />
            </div>
            <button className="buttonSave" onClick={handleSubmit}>
              Save Profile
            </button>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default EditProfileCompany;
