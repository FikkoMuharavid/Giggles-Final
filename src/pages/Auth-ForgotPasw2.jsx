import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth-ForgotPasw2.css";

const ForgotPassword2 = () => {
  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    otp1Ref.current.focus();
  }, []);

  const moveNext = (current, nextRef) => {
    if (current.value.length === 1) {
      nextRef.current.focus();
    }
  };

  const backspace = (event, ref) => {
    if (event.key === "Backspace" && ref.current.value.length === 0) {
      ref.current.previousElementSibling.focus();
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp((prevOtp) => prevOtp + value);
  };

  const handleOtpSubmit = async () => {
    const email = localStorage.getItem("email"); // Ambil email dari localStorage

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/forgot-password/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // Kirimkan email dan OTP
      });

      const data = await response.json();

      if (response.ok) {
        // OTP verified successfully, navigate to the next step
        navigate("/forgotpasw3");
      } else {
        // Show error message if OTP verification fails
        setErrorMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forgotpasw2">
      <div className="logo">GIGGLE'S</div>

      <div className="container">
        <h2>Check your email</h2>
        <p>We sent a reset link to your email, enter the 4-digit code mentioned in the email.</p>

        <div className="otp-container">
          <input type="text" maxLength="1" className="otp-input" ref={otp1Ref} onInput={(e) => moveNext(e.target, otp2Ref)} onKeyDown={(e) => backspace(e, otp1Ref)} onChange={handleOtpChange} />
          <input type="text" maxLength="1" className="otp-input" ref={otp2Ref} onInput={(e) => moveNext(e.target, otp3Ref)} onKeyDown={(e) => backspace(e, otp2Ref)} onChange={handleOtpChange} />
          <input type="text" maxLength="1" className="otp-input" ref={otp3Ref} onInput={(e) => moveNext(e.target, otp4Ref)} onKeyDown={(e) => backspace(e, otp3Ref)} onChange={handleOtpChange} />
          <input type="text" maxLength="1" className="otp-input" ref={otp4Ref} onKeyDown={(e) => backspace(e, otp4Ref)} onChange={handleOtpChange} />
        </div>

        {errorMessage && (
          <center>
            <div className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </div>
          </center>
        )}

        <div className="center" style={{ textAlign: "center", marginTop: "2%" }}>
          <button className="regis" onClick={handleOtpSubmit}>
            <b>Verify Code</b>
          </button>
          <br />
          <br />
          <p>
            Haven't received the email yet? &nbsp;<a href="/forgotpasw1">Resend Email</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword2;
