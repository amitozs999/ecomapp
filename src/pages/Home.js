import React, { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import Carousel from "../components/Carousel/index";
import Category from "../components/category/index";
import { useSelector, useDispatch } from "react-redux";
import Banners from "../components/banner/index";

import { getWishlist } from "../functions/user";

const Home = () => {
  const [wishlistt, setWishlist] = useState([]);
  let { search, user, userwishlist } = useSelector((state) => ({ ...state })); // new search reducer to hold state of curr search text
  let dispatch = useDispatch();
  useEffect(() => {
    if (
      (userwishlist.data !== undefined && !userwishlist.data.wishlist.length) ||
      !localStorage.getItem("wishlist")
    ) {
      console.log("loading wishlist again2");
      loadWishlist();
    }
    // console.log("ll", userwishlist);
    // setWishlist(userwishlist.data.wishlist);
    //
    console.log("lll", wishlistt);
  }, [user]);

  const loadWishlist = () => {
    console.log("ZZZ", wishlistt);
    if (user && user.token) {
      getWishlist(user.token).then((res) => {
        console.log("gg wishlis", res);
        console.log("gg wishlisvv", res.data.wishlist);
        setWishlist(res.data.wishlist);
        console.log("ZZZ", wishlistt);
        console.log("ZZZuser", userwishlist);

        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(res));
        }
        console.log("ZZZ", JSON.parse(localStorage.getItem("wishlist")));

        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: res,
        });

        // if (localStorage.getItem("wishlist")) {
        //   cart = JSON.parse(localStorage.getItem("cart")); //local storage se cart nikal liya
        // }
      });
    }
  };
  return (
    <>
      {/* <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div> */}

      <Carousel />
      <BestSellers />
      <Banners />
      <Category />

      {/* <Benefits />
      <Offers />
     
      <Newest />
     
      <Brands /> */}
      {/* 
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4> */}

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
