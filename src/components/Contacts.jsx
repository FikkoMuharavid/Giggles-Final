import "/src/css/style.css";
import NavbarEditProff from "/src/components/NavbarEditProff.jsx";
import Headeruser1 from "/src/components/Headeruser1.jsx";
import "/src/css/postUser.css";
import { useAuth } from "../AuthContext";

function Contacts() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="avril">
      <NavbarEditProff />

      {/* Call HeaderUser component */}

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

      <Headeruser1 />

      {/* Contact Section */}
      <div className="containerEditPost">
        <div className="contact-section">
          <div className="contact-column">
            <div className="contact-item">
              <img src="/src/image/Twitter.png" alt="Twitter Icon" className="icon" />
              <span>{user?.data?.twitter}</span>
            </div>
            <div className="contact-item">
              <img src="/src/image/Instagram.png" alt="Instagram Icon" className="icon" />
              <span>{user?.data?.instagram}</span>
            </div>
            <div className="contact-item">
              <img src="/src/image/LinkedIn.png" alt="LinkedIn Icon" className="icon" />
              <span>{user?.data?.linkedin}</span>
            </div>
          </div>
          <div className="contact-column">
            <div className="contact-item">
              <img src="/src/image/email.png" alt="Email Icon" className="icon" />
              <span>{user?.data?.email}</span>
            </div>
            <div className="contact-item">
              <img src="/src/image/call (1).png" alt="Phone Icon" className="icon" />
              <span>{user?.data?.phone_number}</span>
            </div>
            <div className="contact-item">
              <img src="/src/image/lokasi.png" alt="Location Icon" className="icon" />
              <span>{user?.data?.user_address}</span>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Contacts;
