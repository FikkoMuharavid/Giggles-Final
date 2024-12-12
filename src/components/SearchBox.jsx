import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/search-box.css";

const SearchBox = ({ value, onChange, onSearch }) => {
  return (
    <div className="search-box-wrapper">
      <div className="search-box">
        {/* Input Section */}
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="What are you looking for"
            value={value}
            onChange={onChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") onSearch();
            }}
          />
        </div>
        {/* Search Button */}
        <button className="search-button" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
