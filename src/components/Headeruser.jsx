import { NavLink } from "react-router-dom";
import "/src/css/HeaderUser.css";

const Headeruser = () => {
  return (
    <div className="HeaderuserAvril">
      <div className="headerAvril">
        <div className="containerHeaderAvril">
          <NavLink exact="true" activeClassName="active" to="/EditProfile" className="header-item">
            Edit Profile
          </NavLink>
          <NavLink exact="true" activeClassName="active" to="/SocialProfile" className="header-item">
            Social Profile
          </NavLink>
          <NavLink exact="true" activeClassName="active" to="/Resume" className="header-item">
            Resume
          </NavLink>
          <NavLink exact="true" activeClassName="active" to="/WorkSpace" className="header-item">
            WorkSpace
          </NavLink>
        </div>
        <hr
          style={{
            margin: "02%",
            marginTop: "-1%",
            borderWidth: "1px",
            marginLeft: "25px",
          }}
        />
      </div>
    </div>
  );
};

export default Headeruser;
