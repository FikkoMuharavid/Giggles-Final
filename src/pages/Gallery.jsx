"use client";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import Card from "../components/Card";
import "../styles/gallery.css";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import axios from "axios";

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null); // state for selected filter

  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // state for filter visibility

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const getGalleryData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/gallery/?category=${selectedFilter || ""}`);
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getGalleryData();
  }, [selectedFilter]);

  // Filtered data based on the search query and selected filter
  const filteredData = data.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearch = () => {
    if (selectedFilter == null) {
      alert("Ops, tolong pilih kategori galery dulu!");
    }
  };

  const filterOptions = ["UI/UX", "Programmer", "Illustrator", "Web Design", "Writing", "Photography", "Interfaces", "Strategy"];

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter === selectedFilter ? null : filter); // toggle filter selection
  };

  return (
    <div>
      <Hero title={"Gallery"} subtitle={"Get inspired by a rich and diverse collection of art. Explore our gallery now."}>
        {/* Search and Filter */}
        <div
          style={{
            display: "flex",
            width: "80%",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <SearchBox value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onSearch={handleSearch} />
          </div>
          <div
            style={{
              flex: "0 0 auto",
              position: "relative",
              display: "inline-block",
            }}
          >
            <button
              onClick={toggleVisibility}
              style={{
                backgroundColor: "white",
                borderRadius: "2rem",
                color: "#B04E75",
                border: "4px solid #B04E75",
                transition: "all 0.5s ease-in-out",
                overflow: "hidden",
                height: isVisible ? "16rem" : "3.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                width: "154px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  color: "#B04E75",
                  width: "154px",
                }}
              >
                {isVisible ? "Filter" : selectedFilter || "Filter"}
              </div>

              {isVisible && (
                <div
                  style={{
                    backgroundColor: "white",
                    textAlign: "start",
                    color: "#B04E75",
                    width: "154px",
                    borderRadius: "0.5rem",
                  }}
                >
                  {filterOptions.map((filter) => (
                    <p
                      key={filter}
                      onClick={() => handleFilterSelect(filter)}
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor: selectedFilter === filter ? "#B04E75" : "transparent",
                        color: selectedFilter === filter ? "white" : "#B04E75",
                        borderRadius: selectedFilter === filter ? "0.5rem" : "0",
                        padding: ".1rem",
                        width: "100%",
                        fontSize: "1rem",
                      }}
                    >
                      {filter}
                    </p>
                  ))}
                </div>
              )}
            </button>
          </div>
        </div>
      </Hero>

      {/* Content */}
      <section>
        <Heading title="Gallery" subtitle="Get inspired by a rich and diverse collection of art. Explore our gallery now." />
        <div className="content-container">
          <div className="gallery-grid-container">
            {filteredData.map((item, index) => (
              <Card key={index} image={item.image_post} name={item.title} id={item.id} />
            ))}
          </div>
        </div>

        {/* Show More Button */}
        {/* <div className="show-more-container">
          <button className="show-more-button">Show More</button>
        </div> */}

        <Footer />
      </section>
    </div>
  );
}
