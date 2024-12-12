import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HomeGuest.css";

function HomeCompany() {
  return (
    <div className="homeGuest">
      <header>
        <Navbar />
        <div className="containerHeader">
          <h2>
            Designed for impact, built
            <br />
            for growth.
          </h2>
          <p>
            Crafted with creativity, designed to inspire. Discover unique
            <br />
            designs to elevate your brand. Ready for you to make them yours.
          </p>

          <button style={{ marginTop: "1%" }}>See More</button>
        </div>
      </header>

      <section>
        <div className="title">
          <h2>Popular Design</h2>
          <p>
            We offer a variety of design services <br />
            to help you make a lasting impression.
          </p>
        </div>

        <div className="containerCarousel">
          <div className="sliderLeft">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="29"
              viewBox="0 0 16 29"
              fill="none"
            >
              <path
                d="M14.125 1.375L1 14.5L14.125 27.625"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="sliderRight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="29"
              viewBox="0 0 16 29"
              fill="none"
            >
              <path
                d="M1.875 27.625L15 14.5L1.875 1.375"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="carouselCards">
            <div className="card">
              <img className="imgCard" src="src\images\img1.png" alt="" />
              <div className="txtCard">Mobile App</div>
            </div>
            <div className="card">
              <img className="imgCard" src="src\images\img2.png" alt="" />
              <div className="txtCard">Desktop App</div>
            </div>
            <div className="card">
              <img className="imgCard" src="src\images\img3.png" alt="" />
              <div className="txtCard">Web App</div>
            </div>
          </div>
          <button style={{ marginTop: "1%" }}>See More</button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </section>

      <section>
        <div className="title">
          <h2>Popular Jobs Category</h2>
          <p>
            Popular Jobs Category Browse through a wide selection of popular job
            categories.
            <br />
            Find your dream job today!
          </p>
        </div>

        <div className="job-grid-container">
          <div className="job-card">
            <img
              src="src\images\ImageCategory/programmer.jpeg"
              alt="Programmer Icon"
            />
            <div className="job-details">
              <div className="job-title">Programmer</div>
              <p>1000 Jobs</p>
            </div>
          </div>
          <div className="job-card">
            <img
              src="src\images\ImageCategory/illustrator.png"
              alt="Illustrator Icon"
            />
            <div className="job-details">
              <div className="job-title">Illustrator</div>
              <div className="job-count">1200 Jobs</div>
            </div>
          </div>
          <div className="job-card">
            <img
              src="src\images\ImageCategory/webDesign.avif"
              alt="Web Design Icon"
            />
            <div className="job-details">
              <div className="job-title">Web Design</div>
              <div className="job-count">5555 Jobs</div>
            </div>
          </div>
          <div className="job-card">
            <img
              src="src\images\ImageCategory/writing.png"
              alt="Writing Icon"
            />
            <div className="job-details">
              <div className="job-title">Writing</div>
              <div className="job-count">8979 Jobs</div>
            </div>
          </div>
          <div className="job-card">
            <img
              src="src\images\ImageCategory/photography.avif"
              alt="Photography Icon"
            />
            <div className="job-details">
              <div className="job-title">Photography</div>
              <div className="job-count">800 Jobs</div>
            </div>
          </div>
          <div className="job-card">
            <img src="src\images\ImageCategory/uiux.jpeg" alt="UI/UX Icon" />
            <div className="job-details">
              <div className="job-title">UI/UX</div>
              <div className="job-count">1234 Jobs</div>
            </div>
          </div>
          <div className="job-card">
            <img
              src="src\images\ImageCategory/interfaces.jpg"
              alt="Interfaces Icon"
            />
            <div className="job-details">
              <div className="job-title">Interfaces</div>
              <div className="job-count">6767 Jobs</div>
            </div>
          </div>
          <div className="job-card">
            <img
              src="src\images\ImageCategory/strategy.avif"
              alt="Strategy Icon"
            />
            <div className="job-details">
              <div className="job-title">Strategy</div>
              <div className="job-count">1200 Jobs</div>
            </div>
          </div>
          <br />
        </div>
      </section>

      <section>
        <div className="title">
          <h2>How to create a perfect resume</h2>
          <p style={{ padding: "0px 8vw" }}>
            How to create a perfect resume is a guide or set of steps explaining
            how to craft an effective resume that attracts the attention of
            recruiters or companies. A good resume should highlight relevant
            skills, experience, and accomplishments tailored to the job being
            applied for. It should be written in a clean, easy-to-read format
            and customized for the specific position.
          </p>
        </div>

        <div className="feature-container">
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/QnUI3sLZ4hc?si=llOdC5GCAK--xAQI"
            ></iframe>
          </div>
          <div className="content-container">
            <p>
              By creating a visual guide along the way, the designer or
              developer can get input from the other people involved in the
              website such as the customer, their manager, and other members of
              the team.
            </p>
            <h2>Feature One</h2>
            <p>
              By creating a visual guide along the way, the designer or
              developer can get input from the other people.
            </p>
            <h2>Feature Two</h2>
            <p>
              By creating a visual guide along the way, the designer or
              developer can get input from the other people.
            </p>
          </div>
        </div>

        <Footer />
      </section>
    </div>
  );
}

export default HomeCompany;
