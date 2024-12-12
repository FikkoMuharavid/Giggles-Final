import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "/src/css/style.css";
import NavbarEditProff from "/src/components/NavbarEditProff.jsx";
import Headeruser1 from "/src/components/Headeruser1.jsx";
import "/src/css/postUser.css";
import axios from "axios";
import { useAuth } from "../AuthContext";

function Post() {
  const { user } = useAuth();
  const [post, setPost] = React.useState([]);

  const navigate = useNavigate();

  const handleCLick = (id) => {
    navigate("/gallery/" + id);
  };

  const getUserPost = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/gallery`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setPost(response.data.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <div className="avril">
      <NavbarEditProff />
      <div className="containerPoto">
        <div className="profile1">
        <img
            src={user?.data?.user_profile ? `${user?.data?.user_profile}` : "/images/basicprofile.png"}
            alt="Profile user"
            style={{ width: "95px", height: "95px", objectFit: "cover" }}  
          />
         <div style={{ textAlign: "left" }}>
            <div>
              <div style={{ textShadow: "0px 0px 10px rgba(255, 255, 255, 0.25)", fontSize: "29px", fontWeight: "500" }}>
                {user?.data?.user_name}
              </div>
              <div style={{ marginLeft: "-2px" }} className="underline1" ></div> {/* Garis di bawah nama */}
            </div>
            <div>{user?.data?.position}</div>
          </div>
        </div>
      </div>
      {/* Call HeaderUser component */}
      <Headeruser1 />

      {/* Profile Section */}

      {/* Project Buttons Section */}
      <div className="containerEditPost" style={{ padding: "40px 10%" }}>
        <br />
        <br />
        {post.length === 0 ? ( // Jika tidak ada postingan
          <div className="no-posts">
            <center>
              <h2 style={{ fontSize: "35px" }}>Uplaod your first post!</h2>
              <br />
              <Link to="/postcreation" className="upload-button">
                <button>Upload</button>
              </Link>
            </center>
          </div>
        ) : (
          <div>
            <Link to="/postcreation" className="upload-button">
              <button>Upload</button>
            </Link>
            <div className="button-container">
              {post.map((post, index) => (
                <div key={index} className="button-item" style={{ marginTop: "3%" }} onClick={() => handleCLick(post.id)}>
                  <img src={post.image_post} alt={`Post ${index}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default Post;
