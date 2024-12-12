import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AboutUs.css";

function AboutUs() {
  return (
    <div className="aboutus">
      <Navbar />
      <div className="container">
        <img src="/Logo.png" alt="" style={{ width: "15%" }} />

        <div className="containerTeks">
          <p style={{ fontSize: "30px" }}>
            Giggle’s is a web platform designed to connect designers with
            companies looking for talent in the field of design. Designers can
            showcase their portfolios, while companies can search for and hire
            designers according to their project needs. Giggle simplifies the
            job search process for designers and helps companies find the right
            creative talent.
          </p>
        </div>

        <div className="section-title">
          <h2>Visi & Misi</h2>
        </div>

        <div
          className="containerImg"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "48%", textAlign: "justify" }}>
            <h2 style={{ fontSize: "38px", marginBottom: "10px" }}>Visi</h2>
            <p>
              Build a meaningful career by integrating creativity, expertise and
              collaboration to create design solutions that are innovative,
              relevant and have a positive impact on society and the digital
              world. I want to be part of the change that provides added value
              through works that are aesthetic, functional, and contribute to
              advances in technology and life.
            </p>
          </div>
          <div style={{ width: "48%", textAlign: "justify" }}>
            <h2 style={{ fontSize: "38px", marginBottom: "10px" }}>Misi</h2>
            <p>
              Develop an attractive and professional portfolio to increase your
              chances of being accepted into a position that matches your
              skills. Make optimal use of digital platforms, professional
              networks and social media to find relevant job opportunities.
              Collaborate with professionals to create innovative digital
              products that can meet client and user needs effectively.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
