import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GaleryJson } from "../api/galeryApi";

import Hero from "../components/Hero";
import JobsItemCard from "../components/JobsItemCard";
import SearchBox from "../components/SearchBox";
import "../styles/jobs-by-category.css";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import axios from "axios";

function JobsByCategory() {
  const params = useParams();
  const category = params.category;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const getJobData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/job/?category=${category}`);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // const dataJson = GaleryJson.getJobsByCategory(category.replace("%20", " "));
    // setData(dataJson);
    getJobData();
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {};

  useEffect(() => {
    if (selectedFilter != null) {
      navigate("/jobs/category/" + selectedFilter);
    }
  }, [selectedFilter, navigate]);

  const filterOptions = ["UI-UX Design", "Programmer", "Illustrator", "Web Design", "Writing", "Photography", "Interfaces", "Strategy"];

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter === selectedFilter ? null : filter); // toggle filter selection
  };

  return (
    <div>
      <Hero title="Jobs Board" subtitle="Find the best job vacancies here! Find your dream job with a variety of attractive options from leading companies. Register now and find the career opportunities that suit you.">
        <SearchBox value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onSearch={handleSearch} onFilter={() => handleFilterSelect()}>
          <div className="filter-dropdown">
            {filterOptions.map((filter) => (
              <p key={filter} onClick={() => setSelectedFilter(filter === selectedFilter ? null : filter)} className={`filter-option ${selectedFilter === filter ? "selected" : ""}`}>
                {filter}
              </p>
            ))}
          </div>
        </SearchBox>
      </Hero>

      <section>
        <Heading title={category.replace("%20", " ")} />

        <div className="jobs-list">
          <div>
            {data.map((item, index) => (
              <div className="job-item" key={index}>
                <JobsItemCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </section>
    </div>
  );
}

export default JobsByCategory;
