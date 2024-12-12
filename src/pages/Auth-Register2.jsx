import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan axios diimpor
import "../styles/Auth-Register2.css";

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [email, setEmail] = useState(""); // State untuk email
  const [username, setUsername] = useState(""); // State untuk username
  const [password, setPassword] = useState(""); // State untuk password
  const [confirmPassword, setConfirmPassword] = useState(""); // State untuk confirm password
  const [error, setError] = useState(""); // State untuk menyimpan error
  const location = useLocation();
  const navigate = useNavigate();

  // Mengambil parameter type dari URL
  const queryParams = new URLSearchParams(location.search);
  const accountType = queryParams.get("type"); // 'user' or 'company'

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();

    // Validasi form
    if (!email || !username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Proses pendaftaran sesuai dengan `accountType`
    console.log(accountType); // 'user' atau 'company'

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/accounts`, {
        email,
        username,
        password,
        role: accountType, // Send the selected account type to the backend
      });

      if (response.status === 201) {
        setOverlayVisible(true);
        setError(""); // Reset error
        setTimeout(() => {
          navigate("/login"); // Redirect ke halaman login setelah sukses
        }, 2000);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="register2">
      <div className="logo">GIGGLE'S</div>

      <div className="container">
        <h2>Sign Up</h2>
        <p>
          If you already have an account, <br /> You can <a href="/login">Login Here !</a>
        </p>

        {/* Email Input */}
        <div className="email">
          <h6>Email</h6>
          <i className="bi bi-envelope" style={{ fontSize: "24px", marginRight: "3%", marginLeft: "0.4%" }}></i>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Menangani perubahan input email
            placeholder="Enter your email address"
          />
          <br />
          <div className="garis"></div>
        </div>

        {/* Username Input */}
        <div className="username">
          <h6>Username</h6>
          <i className="bi bi-person" style={{ fontSize: "24px", marginRight: "3%", marginLeft: "0.4%" }}></i>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Menangani perubahan input username
            placeholder="Enter your username"
          />
          <br />
          <div className="garis"></div>
        </div>

        {/* Password Input */}
        <div className="Password">
          <h6>Password</h6>
          <i className="bi bi-lock" style={{ fontSize: "24px", marginRight: "3%", marginLeft: "0.4%" }}></i>
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Menangani perubahan input password
            placeholder="Enter your password"
          />
          <i
            className={`bi ${passwordVisible ? "bi-eye" : "bi-eye-slash"}`}
            style={{
              position: "absolute",
              right: "8%",
              marginRight: "10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={togglePasswordVisibility}
          ></i>
          <br />
          <div className="garis"></div>
        </div>

        {/* Confirm Password Input */}
        <div className="ConfirmPassword">
          <h6>Confirm Password</h6>
          <i className="bi bi-lock" style={{ fontSize: "24px", marginRight: "3%", marginLeft: "0.4%" }}></i>
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Menangani perubahan input confirm password
            placeholder="Confirm your password"
          />
          <i
            className={`bi ${confirmPasswordVisible ? "bi-eye" : "bi-eye-slash"}`}
            style={{
              position: "absolute",
              right: "8%",
              marginRight: "10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={toggleConfirmPasswordVisibility}
          ></i>
          <br />
          <div className="garis"></div>
        </div>

        {/* Tampilkan error */}
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

        {/* Button Register */}
        <div className="center" style={{ textAlign: "center", marginTop: "2%" }}>
          <button className="regis" onClick={handleRegisterClick}>
            <b>Register</b>
          </button>
          <br />
          <br />
        </div>
      </div>

      {/* Overlay after successful registration */}
      {overlayVisible && (
        <div id="overlay" className="bgOverlay">
          <div className="containerOverlay center">
            <h2>Registration Successful!</h2>
            <p>
              Congratulations, your account has been <br /> Successfully created
            </p>
            <a href="/login">
              <button>Login</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
