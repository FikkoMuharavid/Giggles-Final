import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth-ForgotPasw1.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot-password/send-email`, { email });
      localStorage.setItem("email", email);
      // redirect to verification page on success
      navigate("/forgotpasw2");
    } catch (err) {
      setError("Failed to send reset link");
    }
  };

  return (
    <div className="forgotpasw1">
      <div className="logo">GIGGLE'S</div>

      <div className="container">
        <h2>Forgot Password</h2>
        <p>Enter your email to reset password</p>

        <form onSubmit={handleSubmit}>
          <div className="email">
            <h6>Email</h6>
            <i className="bi bi-envelope" style={{ fontSize: "24px", marginRight: "3%", marginLeft: "0.4%" }}></i>
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email address" required />
            <br />
            <div className="garis"></div>
          </div>

          <div className="center" style={{ textAlign: "center", marginTop: "2%" }}>
            <button className="regis" type="submit">
              <b>Continue</b>
            </button>
            <br />
            <br />
          </div>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
