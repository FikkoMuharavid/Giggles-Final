import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/navbar.css";

const NavbarUser = () => {
  const { user } = useAuth();
  console.log(user);

  const authButtons = [
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/register1" },
  ];

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (event) => {
    if (
      !event.target.closest(".profile-icon") &&
      !event.target.closest(".dropdown-menu")
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    // Refresh halaman
    window.location.reload();
    // Redirect ke halaman login
    // navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Gallery", path: "/gallery" },
    { name: "Jobs", path: "/jobs" },
    { name: "About Us", path: "/aboutus" },
  ];

  const dropdownItems = [
    {
      name: "Profile",
      path: user?.data?.role === "company" ? "/companyabout" : "/post",
      icon: "bi bi-person",
    },
    { name: "Sign Out", action: handleLogout, icon: "bi bi-box-arrow-right" },
  ];

  // const dropdownItems = [
  //   { name: "Profile", path: "/Post", icon: "bi bi-person" },
  //   { name: "Sign Out", action: handleLogout, icon: "bi bi-box-arrow-right" }, // Aksi logout
  // ];

  return (
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

      {user?.data ? (
        <div className="navRight">
          <div className="notification">
            <NavLink to="/notification">
              <img
                src="../images/icnNotification.png"
                alt="Notification"
                style={{ width: "30px" }}
              />
            </NavLink>
          </div>
          <div className="profile">
            <img
              src={
                user?.data?.role == "company" && user?.data?.company_profile
                  ? `${user?.data?.company_profile}`
                  : user?.data?.user_profile
                  ? `${user?.data?.user_profile}`
                  : "/images/basicprofile.png"
              }
              className="profile-icon"
              alt="Profile"
              style={{
                width: "73px",
                height: "73px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="dropdown-menu" style={{ zIndex: 10000 }}>
                {dropdownItems.map((item, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={item.action || (() => navigate(item.path))}
                    style={{ cursor: "pointer" }}
                  >
                    <span className={item.icon}></span>
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="navButton">
          {authButtons.map((button, index) => (
            <div
              key={index}
              className={button.name === "Login" ? "login" : "signUp"}
            >
              <div className="fontButton">
                <NavLink to={button.path}>{button.name}</NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavbarUser;
