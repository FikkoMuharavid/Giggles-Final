import { NavLink } from "react-router-dom";
import "/src/css/HeaderUser.css";

const Headeruser = () => {
  return (
    <div className="HeaderuserAvril">
      <div className="headerAvril">
        <div className="containerHeaderAvril">
          <NavLink exact="true" activeClassName="active" to="/Post" className="header-item">
            Post
          </NavLink>
          <NavLink exact="true" activeClassName="active" to="/Collection" className="header-item">
            Collection
          </NavLink>
          <NavLink exact="true" activeClassName="active" to="/Stars" className="header-item">
            Stars
          </NavLink>
          <NavLink exact="true" activeClassName="active" to="/Contacts" className="header-item">
            Contacts
          </NavLink>
        </div>
        <hr
          style={{
            margin: "02%",
            marginTop: "-1%",
            borderWidth: "2px",
          }}
        />
      </div>
    </div>
  );
};

export default Headeruser;
