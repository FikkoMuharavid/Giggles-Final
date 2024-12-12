import "/src/css/style.css";
import NavbarEditProff from "/src/components/NavbarEditProff.jsx";
import Headeruser1 from "/src/components/Headeruser1.jsx";
import "/src/css/postUser.css";
import { useAuth } from "../AuthContext";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Collection() {
  const { user } = useAuth();
  const [post, setPost] = React.useState([]);

  const navigate = useNavigate();

  const handleCLick = (id) => {
    navigate("/gallery/" + id);
  };

  const getUserCollection = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/gallery/collection`, {
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

  React.useEffect(() => {
    getUserCollection();
  }, []);

  return (
    <div className="avril Collection">
      {/* Navbar */}
      <NavbarEditProff />

      {/* Profile Section */}
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

      {/* Header */}
      <Headeruser1 />

      {/* Project Buttons Section */}
      <div className="containerEditPost">
        <div className="button-container">
          {post.map((item) => (
            <div key={item.id} className="button-item" onClick={() => handleCLick(item.id)}>
              <img src={`${item.image_post}`} alt="Button 1" />
            </div>
          ))}
          {/* <div className="button-item">
            <img src="/src/image/img2.png" alt="Button 2" />
          </div>
          <div className="button-item">
            <img src="/src/image/img3.png" alt="Button 3" />
          </div>
          <div className="button-item">
            <img src="/src/image/img4.png" alt="Button 4" />
          </div> */}
        </div>
      </div>
      <br />
    </div>
  );
}

export default Collection;
