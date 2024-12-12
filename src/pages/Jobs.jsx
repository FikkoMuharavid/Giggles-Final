"use client";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import JobsItemCard from "../components/JobsItemCard";
import JobCard from "../components/JobCard";
import { GaleryJson } from "../api/galeryApi";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import "../styles/jobs.css";
import Footer from "../components/Footer";

import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

function Jobs() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const getJobData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/job/?category=${selectedFilter || ""}`);
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

  const filteredJobs = searchQuery ? jobs.filter((job) => job.position.toLowerCase().includes(searchQuery.toLowerCase())) : jobs;

  // useEffect(() => {
  //   let updatedJobs = jobs;

  //   if (selectedFilter) {
  //     updatedJobs = updatedJobs.filter((job) => job.category.toLowerCase() === selectedFilter.toLowerCase());
  //   }

  //   if (searchQuery) {
  //     updatedJobs = updatedJobs.filter((job) => job.title.toLowerCase().includes(searchQuery.toLowerCase()));
  //   }

  //   setFilteredJobs(updatedJobs);
  // }, [selectedFilter, searchQuery, jobs]);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const filterOptions = ["UI-UX Design", "Programmer", "Illustrator", "Web Design", "Writing", "Photography", "Interfaces", "Strategy"];

  return (
    <div>
      <Hero title="Jobs Board" subtitle="Find the best job vacancies here! Find your dream job with a variety of attractive options from leading companies. Register now and find the career opportunities that suit you.">
        {/* Search and Filter */}
        <div
          style={{
            display: "flex",
            width: "80%",
            gap: "5rem",
            alignItems: "center",
            margin: "2rem auto",
          }}
        >
          <div style={{ flex: 1 }}>
            <SearchBox value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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

                  color: "#B04E75",
                  width: "154px",
                  fontSize: "1.2rem",
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
                      onClick={() => setSelectedFilter(filter === selectedFilter ? null : filter)}
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

      <section>
        {/* Popular Jobs Category */}
        <Heading title="Popular Jobs Category" subtitle="Browse through a wide selection of popular job categories. Find your dream job today!" />
        <div className="grid-container">
          {categories.map((item, index) => (
            <div key={index} onClick={() => navigate("/jobs/category/" + item.name)}>
              <JobCard item={item} />
            </div>
          ))}
        </div>

        {/* Recent Posts */}
        <Heading title="Recent Posts" subtitle="Check out the latest job vacancies posted by leading companies." />
        <div className="content-container">
          <div className="recent-posts">
            {filteredJobs.map((item, index) => (
              <JobsItemCard key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </section>
    </div>
  );
}

export default Jobs;
