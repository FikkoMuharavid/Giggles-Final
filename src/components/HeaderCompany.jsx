import { NavLink } from "react-router-dom";
import "../styles/Company-Profile.css";

function HeaderCompany() {
  return (
    <div className="headerz">
      <div className="containerHeaderz">
        <NavLink exact activeClassName="active" to="/companyabout" className="header-item">
          About
        </NavLink>
        <NavLink exact activeClassName="active" to="/companyjobs" className="header-item">
          Job List
        </NavLink>
        <NavLink exact activeClassName="active" to="/companycontact" className="header-item">
          Contact
        </NavLink>
      </div>
      <hr style={{ margin: "0 2%", marginTop: "-0.5%", borderWidth: "2px" }} />
    </div>
  );
}

export default HeaderCompany;
