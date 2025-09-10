import React from "react";
import "./Featured.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // const handleSearch = (e) => {
  //   if (e.type === "click" || (e.type === "keypress" && e.key === "Enter")) {
  //     navigate(`/gigs?search=${input}`);
  //   }
  // };
  const handleSearch = () => {
    navigate(`/gigs?search=${input}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Trigger the search when the "Enter" key is pressed
      handleSearch();
    }
  };

  const handleTags = (e) => {
    navigate(`/gigs?cat=${e.target.value}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="/img/search.png" alt="" />
              <input
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder='Try "building mobile app"'
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button onClick={handleTags} value="coding">
              Coding
            </button>
            <button onClick={handleTags} value="Javascript">
              Javascript
            </button>
            <button onClick={handleTags} value="design">
              Design
            </button>
            <button onClick={handleTags} value="ai">
              AIML
            </button>
          </div>
        </div>

        <div className="right">
          <img src="/img/man2.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
