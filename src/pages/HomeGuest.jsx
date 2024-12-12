import NavbarGuest from "../components/NavbarGuest";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/HomeGuest.css";
import JobCard from "../components/JobCard";
import axios from "axios";
import { GaleryJson } from "../api/galeryApi";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Carousel from "../components/Carousel";

function HomeGuest() {
  const params = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  
  const getJobData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/job/?category=${
          selectedFilter || ""
        }`
      );
      setJobs(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getJobData();

    const dataCategory = GaleryJson.getCategories();
    // const dataJobs = GaleryJson.getJobs();
    setCategories(dataCategory);
    // setJobs(dataJobs);
    // setFilteredJobs(jobs);

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const getGalleryData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/gallery/`);
      const formattedItems = response.data.data.map((item) => ({
        text: item.title,
        image: item.image_post,
      }));

      setItems(formattedItems);

      console.log(response.data.data);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getGalleryData();
  }, []);
  if (loading) {
    return <div>Loading . . .</div>;
  }
  return (
    <div className="homeGuest">
      <header>
        <NavbarGuest />
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

          <button style={{ marginTop: "1%" }}>
          <Link to="/gallery">
            See More
          </Link></button>
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

        <div className="carousel-section">
          <Carousel items={items} />
        </div>

        {/* <div className="containerCarousel">
          <div className="sliderLeft">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="29" viewBox="0 0 16 29" fill="none">
              <path d="M14.125 1.375L1 14.5L14.125 27.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="sliderRight">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="29" viewBox="0 0 16 29" fill="none">
              <path d="M1.875 27.625L15 14.5L1.875 1.375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        </div> */}
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

        <div className="grid-container">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate("/jobs/category/" + item.name)}
            >
              <JobCard item={item} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="title">
          <h2>How to create a perfect resume</h2>
          <p style={{ padding: "0px 8vw" }}>
            How to create a perfect resume is a guide or set of steps explaining
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
          <h2>How To Make a Resume</h2><br />
            <p style={{ textAlign: "justify" }}>
            Are you a high school student or college student looking for an internship or side hustle? Then you most likely need to write a cover letter and make a CV. In this YouTube video, I’ll show you how to make the perfect resume for students using Microsoft Word. In this tutorial, I will also provide you with the most important resume tips. The main purpose of this tutorial is to get you noticed by hiring managers and employers and land you plenty of job interviews. If you have questions regarding this YouTube video, comment down below and I will respond as soon as possible.
            </p>
            {/* <p>
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
            </p> */}
          </div>
        </div>

        <Footer />
      </section>
    </div>
  );
}

export default HomeGuest;
