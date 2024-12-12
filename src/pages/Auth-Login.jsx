import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import "../styles/Auth-Login.css";
import "../styles/App.css";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Simpan token ke localStorage
      localStorage.setItem("token", token);

      // Pastikan user.role valid sebelum redirect
      // if (user.role === "user") {
      //   navigate("/homeUser");
      // } else if (user.role === "company") {
      //   navigate("/homeCompany");
      // } else {
      //   throw new Error("Unknown role");
      // }
      navigate("/home");

      // Perbarui state otentikasi global
      login(user.role);
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="pagelogin">
      <div className="logoauth">GIGGLE'S</div>
      <div className="container">
        <h2 style={{ paddingBottom: "2%", textAlign: "left" }}>Sign In</h2>
        <p>
          If you don’t have an account register <br /> You can <Link to="/register1">&nbsp;Register Here !</Link>
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="email">
            <h6>Email</h6>
            <i
              className="bi bi-envelope"
              style={{
                fontSize: "24px",
                marginRight: "3%",
                marginLeft: "0.4%",
              }}
            ></i>
            <input type="text" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br />
            <div className="garis"></div>
          </div>

          <div className="Password">
            <h6 style={{ marginTop: "2%" }}>Password</h6>
            <i
              className="bi bi-lock"
              style={{
                fontSize: "24px",
                marginRight: "3%",
                marginLeft: "0.4%",
              }}
            ></i>
            <input type={passwordShown ? "text" : "password"} placeholder="Enter your password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <i
              className={`bi ${passwordShown ? "bi-eye" : "bi-eye-slash"}`}
              style={{
                position: "absolute",
                right: "8%",
                marginRight: "10px",
                cursor: "pointer",
                marginTop: "10px",
              }}
              id="togglePassword"
              onClick={togglePassword}
            ></i>
            <br />
            <div className="garis"></div>
          </div>

          <label className="custom-checkbox">
            <input type="checkbox" name="option3" />
            <span className="checkmark"></span>
            Remember Me
            <Link to="/forgotpasw1" style={{ marginLeft: "auto" }}>
              Forgot Password ?
            </Link>
          </label>

          <div className="center" style={{ textAlign: "center" }}>
            <button type="submit" style={{ marginTop: "3%" }}>
              <b>Login</b>
            </button>
            <br />
            <br />
            <div
              className="text-with-lines"
              style={{
                paddingLeft: "4%",
                paddingRight: "4%",
                marginBottom: "2%",
              }}
            >
              or do it via other accounts
            </div>
            <div className="icon-circle">
              <i className="bi bi-google" style={{ fontSize: "28px", color: "rgba(0, 0, 0, 0.726)" }}></i>
            </div>
            <div className="icon-circle">
              <i className="bi bi-apple" style={{ fontSize: "30px", color: "rgba(0, 0, 0, 0.726)" }}></i>
            </div>
            <div className="icon-circle">
              <i className="bi bi-facebook" style={{ fontSize: "34px", color: "rgba(0, 0, 0, 0.726)" }}></i>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
