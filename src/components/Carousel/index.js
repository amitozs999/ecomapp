import React from "react";
import Slider from "react-slick";
import Slide from "./Slide";
import "./index.scss";
//import { sliderContent } from "../../mock/slider";
import { NextArrow, PrevArrow } from "./Arrows";
//import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

const sliderContent = [
  // {
  //   ID: 1,
  //   title: "digitalBT",
  //   description: "digitalBD",
  //   bgImg:
  //     "https://res.cloudinary.com/dlwkqblhx/image/upload/v1696227618/dwf_cleanup_soef4e.png",
  //   url: "/",
  // },
  {
    ID: 5,
    title: "fashionBT",
    description: "fashionBD",
    bgImg:
      "https://res.cloudinary.com/dlwkqblhx/image/upload/v1696229604/ehhhew_hiuogz.jpg",
    url: "/",
  },
  {
    ID: 3,
    title: "toyBT",
    description: "toyBD",
    bgImg:
      "https://res.cloudinary.com/dlwkqblhx/image/upload/v1696229605/qeff_haqse7.jpg",
    url: "/",
  },
  {
    ID: 2,
    title: "stationeryBT",
    description: "stationeryBD",
    bgImg:
      "https://res.cloudinary.com/dlwkqblhx/image/upload/v1696229918/tjujtkt_jphjwz.jpg",
    url: "/",
  },

  {
    ID: 4,
    title: "houseBT",
    description: "houseBD",
    bgImg:
      "https://res.cloudinary.com/dlwkqblhx/image/upload/v1696229605/wffq_tq9m6b.jpg",
    url: "/",
  },

  // {
  //   ID: 6,
  //   title: "beautyBT",
  //   description: "beautyBD",
  //   bgImg: "url('/images/slider-img/beauty-banner.webp')",
  //   url: "/",
  // },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",

    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
    // appendDots: (dots) => (
    //   <div className="bg-transparent !pb-[40px]">
    //     <ul> {dots} </ul>
    //   </div>
    // ),
  };

  return (
    // <div>
    //   <Slider {...settings}>
    //     <div>
    //       <h3>AHHHHHHH1</h3>
    //     </div>
    //     <div>
    //       <h3>HHHH2</h3>
    //     </div>
    //     <div>
    //       <h3>HHHHH3</h3>
    //     </div>
    //     <div>
    //       <h3>HHHHHHHH4</h3>
    //     </div>
    //     <div>
    //       <h3>HHHHHHHH5</h3>
    //     </div>
    //     <div>
    //       <h3>HHHHHHHHH6</h3>
    //     </div>
    //   </Slider>
    // </div>
    <div className="carousdiv">
      <Slider {...settings}>
        {" "}
        {sliderContent.map((slideContent) => {
          return <Slide key={slideContent.ID} {...slideContent} />;
        })}{" "}
      </Slider>{" "}
    </div>
  );
};

export default Carousel;
