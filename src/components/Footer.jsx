import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer>
      <h2>Contact Us</h2>
      <br />
      <p style={{ textAlign: "center", padding: "20px", lineHeight: "2" }}>
        Gigglecorps@company.com <br />
        (123) 29389 9283 9389 <br />
        <br />
        21 Surabaya, Indonesian, 33121 <br />
      </p>

      <div className="containerIcn">
        <a href="">
          <div className="icnFooter">
            <i
              className="bi bi-facebook"
              style={{ fontSize: "45px", color: "#b04e75" }}
            />
          </div>
        </a>
        <a href="">
          <div className="icnFooter">
            <i
              className="bi bi-twitter"
              style={{ fontSize: "45px", color: "#b04e75" }}
            />
          </div>
        </a>
        <a href="">
          <div className="icnFooter">
            <i
              className="bi bi-instagram"
              style={{ fontSize: "45px", color: "#b04e75" }}
            />
          </div>
        </a>
        <a href="">
          <div className="icnFooter">
            <i
              className="bi bi-linkedin"
              style={{ fontSize: "45px", color: "#b04e75" }}
            />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

