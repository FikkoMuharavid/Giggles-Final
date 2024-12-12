import "/src/css/style.css"; // Pastikan path ini benar
import "/src/css/EditProf.css"; // Pastikan path ini benar
import Navbar from "/src/components/Navbar"; // Impor NavbarUser
import Headeruser from "/src/components/Headeruser";
import { useAuth } from "../AuthContext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function EditProfile() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [work, setWork] = useState([]);
  const [education, setEducation] = useState([]);

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

  const [workData, setWorkData] = useState({
    position: "",
    company_name: "",
    start_date: "",
    end_date: "",
  });

  const [educationData, setEducationData] = useState({
    school_name: "",
    degree: "",
    end_date: "",
  });

  const getWorkData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/work`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWork(response.data.data);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const getEducationData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/education`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEducation(response.data.data);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

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
    getWorkData();
    getEducationData();
    console.log(work);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    console.log(profileData);
  };

  const handleInputWorkChange = (e) => {
    const { name, value } = e.target;
    setWorkData({ ...workData, [name]: value });
    console.log(workData);
  };

  const handleInputEduChange = (e) => {
    const { name, value } = e.target;
    setEducationData({ ...educationData, [name]: value });
    console.log(educationData);
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

  const handleSubmitWork = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/work`, workData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const handleDeleteWork = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/work/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const handleSubmitEdu = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/education`, educationData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const handleDeleteEdu = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/education/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Mengambil bagian YYYY-MM-DD
  };

  return (
    <div>
      {/* Tambahkan NavbarUser di bagian atas */}
      <Navbar />

      {/* Tambahkan HeaderUser di bawah Navbar */}
      <Headeruser />

      <div className="containerEditProfile22">
        <div className="containerProfilee">
          <div className="changephoto">
            <div className="profile-container">
            <img
            src={user?.data?.user_profile ? `${user?.data?.user_profile}` : "/images/basicprofile.png"}
            alt="Profile user"
            style={{ width: "95px", height: "95px", objectFit: "cover", borderRadius: "50%" }}  
          />
              <div className="profile">
                <div className="profile-name">
                  {user?.data?.user_name}
                  <div className="underline"></div>
                </div>
                <div className="additional-text">{user?.data?.position}</div>
              </div>
            </div>
            <button className="change" style={{ marginLeft: "3%" }} onClick={handleClick}>
              Change Photo
            </button>
            <input type="file" name="profile" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
          </div><br />

          <div className="form-grid-avril">
            <div className="form-group">
              <h3>Name</h3>
              <input type="text" placeholder="Enter your name" name="name" value={profileData.name} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ width: "96%" }}>
              <h3>Location</h3>
              <input type="text" placeholder="Enter your location" name="address" value={profileData.address} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ width: "96%" }}>
              <h3>Bio</h3>
              <input type="text" placeholder="Enter your bio" name="bio" value={profileData.bio} onChange={handleInputChange} />
            </div>
            <button className="buttonSave1" onClick={handleProfileSubmit}>
              Save Profile
            </button>
          </div><br /><br /><br /><br />  <br />

          <br /><div className="containerEditwork">
            <div className="containerEdit">
              <h3>Work History & Education</h3>
              <div className="divider"></div>
              <div className="form-grid-edit">
                <div className="form-group-edit work-history">
                  <h3>Additional Work History</h3>
                  {work?.length > 0 &&
                    work.map((item) => {
                      return (
                        <>
                          <div className="two-column">
                            <input type="text" placeholder="Position" name="position" value={item.position} disabled />
                            <span className="at-text">at</span>
                            <input type="text" placeholder="Company" name="company_name" value={item.company_name} disabled />
                          </div>
                          <div className="two-column">
                            <input type="date" placeholder="Start Year" name="start_date" value={formatDate(item.start_date)} disabled />
                            <span className="at-text">to</span>
                            <input type="date" placeholder="End Year" name="end_date" value={formatDate(item.end_date)} disabled />
                          </div>
                          <a style={{ color: "#B04E75" }} onClick={() => handleDeleteWork(item.id)}>

                            Remove Work History
                          </a><br />
                        </>
                      );
                    })}
                  <br /><h3>Additional Work History</h3>
                  <div className="two-column">
                    <input type="text" placeholder="Position" name="position" value={workData.position} onChange={handleInputWorkChange} />
                    <span className="at-text">at</span>
                    <input type="text" placeholder="Company" name="company_name" value={workData.company_name} onChange={handleInputWorkChange} />
                  </div>
                  <div className="two-column">
                    <input type="date" placeholder="Start Year" name="start_date" value={workData.start_date} onChange={handleInputWorkChange} />
                    <span className="at-text">to</span>
                    <input type="date" placeholder="End Year" name="end_date" value={workData.end_date} onChange={handleInputWorkChange} />
                  </div>
                  <button style={{ width: "15%" }} onClick={handleSubmitWork}>
                    Add Work
                  </button>
                </div>

                <div className="form-group-edit education">
                  <h3>Additional Education</h3>
                  {education?.length > 0 &&
                    education.map((item) => {
                      return (
                        <>
                          <div className="three-column">
                            <input type="text" placeholder="Degree" name="degree" value={item.degree} disabled />
                            <span className="at-text">at</span>
                            <input type="text" placeholder="School / University" name="school_name" value={item.school_name} disabled />
                            <input type="date" placeholder="Year" name="end_date" value={formatDate(item.end_date)} disabled />
                          </div>
                          <a style={{ color: "#B04E75", marginTop: "1%" }} onClick={() => handleDeleteEdu(item.id)}>
                            Remove Education
                          </a><br />
                          {/* <button style={{ width: "15%" }} onClick={() => handleDeleteEdu(item.id)}>
                            Remove Education
                          </button> */}
                        </>
                      );
                    })}
                  <div className="three-column">
                    <input type="text" placeholder="Degree" name="degree" value={educationData.degree} onChange={handleInputEduChange} />
                    <span className="at-text">at</span>
                    <input type="text" placeholder="School / University" name="school_name" value={educationData.school_name} onChange={handleInputEduChange} />
                    <input type="date" placeholder="Year" name="end_date" value={educationData.end_date} onChange={handleInputEduChange} />
                  </div>
                  <button style={{ width: "20%", marginTop: "1%" }} onClick={handleSubmitEdu}>
                    Add Education
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
