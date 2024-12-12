import Navbar from "../components/Navbar";
import "../styles/company-editprofile.css";
import HeaderEditCompany from "../components/HeaderEditCompany";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function CompanyEditAbout() {
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
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
      setProfileData({
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
      });
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

  return (
    <>
      <Navbar />
      <div className="company2">
        <HeaderEditCompany />

        <div className="containerEditAbout">
          <div className="containerEdit">
            <div className="tittle">About Company</div>
            <hr
              style={{
                marginTop: "13px",
                border: "2px solid #fff",
                boxShadow: "0px 0px 4px 0px rgba(255, 255, 255, 0.25)",
              }}
            />

            <div className="form" style={{ marginTop: "30px" }}>
              <h3>Headline</h3>
              <input placeholder="Type here..." type="text" name="headline" value={profileData.headline} onChange={handleInputChange} />
            </div>

            <div className="form" style={{ marginTop: "20px" }}>
              <h3>Body</h3>
              <input placeholder="Type here..." type="text" name="body" value={profileData.body} onChange={handleInputChange} />
            </div>

            <div className="form" style={{ marginTop: "20px" }}>
              <h3>Visi</h3>
              <input placeholder="Type here..." type="text" name="visi" value={profileData.visi} onChange={handleInputChange} />
            </div>

            <div className="form" style={{ marginTop: "20px" }}>
              <h3>Misi</h3>
              <input placeholder="Type here..." type="text" name="misi" value={profileData.misi} onChange={handleInputChange} />
            </div>
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

export default CompanyEditAbout;
