import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function NavbarGuest() {
  const navItems = [
    { name: "Home", path: "/homeGuest" },
    { name: "Gallery", path: "/gallery" },
    { name: "Jobs", path: "/jobs" },
    { name: "About Us", path: "/aboutus" },
  ];

  const authButtons = [
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/register1" },
  ];

  return (
    <nav>
      <div className="navMenu">
        {navItems.map((item, index) => (
          <NavLink key={index} to={item.path} className={({ isActive }) => (isActive ? "menuActive" : "menuNonActive")}>
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="navGiggle">
        <div className="giggle">Giggle’s</div>
      </div>

      <div className="navButton">
        {authButtons.map((button, index) => (
          <div key={index} className={button.name === "Login" ? "login" : "signUp"}>
            <div className="fontButton">
              <NavLink to={button.path}>{button.name}</NavLink>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default NavbarGuest;
