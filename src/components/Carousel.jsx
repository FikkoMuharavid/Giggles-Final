import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/carousel.css";
import { Link } from "react-router-dom";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = items.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  return (
    <div className="containerCarousel">
      {/* Left Slider Button */}
      <div className="sliderLeft" onClick={prevSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="29" viewBox="0 0 16 29" fill="none">
          <path d="M14.125 1.375L1 14.5L14.125 27.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Carousel Cards */}
      <div className="carouselCards">
        <div
          className="carouselSlider"
          style={{
            transform: `translateX(-${(currentIndex / items.length) * 100}%)`,
            width: `${items.length * 100}%`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="card">
              <img src={`${item.image}`} alt={item.text} className="imgCard" />
              <div className="txtCard">{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Slider Button */}
      <div className="sliderRight" onClick={nextSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="29" viewBox="0 0 16 29" fill="none">
          <path d="M1.875 27.625L15 14.5L1.875 1.375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* "See More" Button */}
      <Link to="/gallery" className="seeMoreBtn" style={{ marginTop: "1%", padding: "2% 4%", fontSize: "20px" }}>
        See More
      </Link>
    </div>
  );
};

export default Carousel;
