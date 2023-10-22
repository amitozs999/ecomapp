import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import Carousel from "../components/Carousel/index";
import Category from "../components/category/index";

import Banners from "../components/banner/index";

const Home = () => {
  return (
    <>
      {/* <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div> */}

      <Carousel />
      <Category />
      <Banners />

      {/* <Benefits />
      <Offers />
     
      <Newest />
     
      <Brands /> */}
      {/* 
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4> */}
      <BestSellers />

      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4> */}
      <NewArrivals />

      <br />
      <br />
    </>
  );
};

export default Home;
