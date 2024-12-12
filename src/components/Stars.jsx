import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/style.css";
import "/src/css/postUser.css";
import NavbarEditProff from "/src/components/NavbarEditProff.jsx";
import Headeruser1 from "/src/components/Headeruser1.jsx";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { formatDistanceToNow, parseISO } from "date-fns";

function Stars() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleCLick = (id) => {
    navigate("/gallery/" + id);
  };

  const [post, setPost] = useState(null);

  const getStarredPost = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/gallery/star`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(response.data.data); // Mengembalikan data pengguna
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  useEffect(() => {
    getStarredPost();
  }, []);

  function TimeAgo(timestamp) {
    if (!timestamp) return null;

    const timeAgo = formatDistanceToNow(parseISO(timestamp), { addSuffix: true });

    return timeAgo;
  }

  return (
    <div className="avril">
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

      {/* Call HeaderUser component */}
      <Headeruser1 />

      {/* New Job Card Section */}
      {post?.map((post) => (
        <div key={post.id} className="containerEditPost" style={{ paddingTop: "10vh" }}>
          <div className="job-cardAvril">
            <div className="job-image">
              <img src={`${post.image_post}`} alt="jobsStars" onClick={() => handleCLick(post.id)} />
              <div className="rating">
                {Array.from({ length: post.rate }, (_, index) => (
                  <span key={index} className={`star ${index < 5 ? "filled" : ""}`} data-value={index + 1}>
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <div className="job-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="job-info">
                <span>{TimeAgo(post.time)}</span>
                <div className="job-info1">
                  <span>{post.time.split("T")[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <br /> */}
    </div>
  );
}

export default Stars;
