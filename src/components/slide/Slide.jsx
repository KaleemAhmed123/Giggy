import React, { useState, useEffect } from "react";
import "./Slide.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = ({ children }) => {
  const [slidesToShow, setSlidesToShow] = useState(3); // Default to show 3 slides

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(4); // Show 3 slides for screens wider than 1024px
      } else if (window.innerWidth >= 780) {
        setSlidesToShow(3); // Show 2 slides for screens wider than 780px
      } else if (window.innerWidth >= 420) {
        setSlidesToShow(2); // Show 2 slides for screens wider than
      } else {
        setSlidesToShow(1); // Show 1 slide for screens narrower than 780px
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    centerMode: false,
    adaptiveHeight: true,
    arrows: true,
  };

  return (
    <div className="slide">
      <div className="container">
        <Slider {...settings}>{children}</Slider>
      </div>
    </div>
  );
};

export default Slide;
