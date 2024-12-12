import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth-ForgotPasw3.css";

function ForgotPasw3() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();

    // Validasi password dan konfirmasi password
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      return;
    }

    const email = localStorage.getItem("email"); // Ambil email dari localStorage
    const otp = localStorage.getItem("otp"); // Ambil OTP jika diperlukan

    try {
      // Kirim data password baru ke backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/forgot-password/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Tampilkan overlay sukses dan navigasi ke login
        setOverlayVisible(true);
      } else {
        setErrorMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forgotpasw3">
      <div className="logo">GIGGLE'S</div>

      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <h2>Reset a New Password</h2>
          <p>Choose a new password</p>
        </div>

        {/* Password Input */}
        <div className="Password">
          <h6>Password</h6>
          <i className="bi bi-lock" style={{ fontSize: "24px", marginRight: "3%", marginLeft: "0.4%" }}></i>
          <input type={passwordVisible ? "text" : "password"} placeholder="Enter your password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <i
            className={passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"}
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
          <input type={confirmPasswordVisible ? "text" : "password"} placeholder="Confirm your password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <i
            className={confirmPasswordVisible ? "bi bi-eye" : "bi bi-eye-slash"}
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

        {/* Error Message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Button to Submit Password */}
        <div className="center" style={{ textAlign: "center", marginTop: "2%" }}>
          <button className="regis" onClick={handleRegisterClick}>
            <b>Continue</b>
          </button>
          <br />
          <br />
        </div>
      </div>

      {/* Overlay Success */}
      {overlayVisible && (
        <div className="bgOverlay" style={{ zIndex: "1000", display: "block" }}>
          <div className="containerOverlay center">
            <h2>Success!</h2>
            <p>
              Congratulations, your password has been changed. <br /> Click continue to login.
            </p>

            <Link to="/login">
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasw3;
