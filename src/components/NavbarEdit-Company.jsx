import React from 'react';
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "Gallery", path: "/gallery" },
  { name: "Jobs", path: "/jobs" },
  { name: "About Us", path: "/aboutus" },
];


const NavbarEditCompany = () => (
  <nav>
    <div className="navMenu">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menuActive" : "menuNonActive"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

    <div className="navGiggle">
      <div className="giggle">Giggle’s</div>
    </div>

    <div className="navButton">
      <div className="signUp fontButton" style={{ maxWidth: '50%' }}>
        <NavLink to="/company-edit-profile"> Edit Profile </NavLink>
      </div>
    </div>
  </nav>
);

export default NavbarEditCompany;

