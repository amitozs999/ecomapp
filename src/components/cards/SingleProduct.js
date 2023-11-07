import React, { useEffect, useState } from "react";

import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import asas from "../../images/asas.jpg";
import ProductListItems from "./ProductListItems";

import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

import { addToWishlist } from "../../functions/user";

import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { getUserCart, emptyUserCart } from "../../functions/user";
import { userCart } from "../../functions/user";

import { userCart2 } from "../../functions/user";
import "./index.scss";
const { TabPane } = Tabs;

// const SingleProduct = ({ product }) => {
//   const { title, images, description } = product; //fetch this prod details from props

// this is childrend component of Product page

const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [productsx, setProducts] = useState([]);
  let history = useHistory();

  const { title, images, description, _id } = product;

  useEffect(() => {
    if (user && user.token) {
      getUserCart(user.token).then((res) => {
        console.log("user cart res", JSON.stringify(res.data, null, 4));
        //setProducts(res.data.products);
        // setTotal(res.data.cartTotal);
      });

      console.log(productsx);
    }
  }, []);

  const handleAddToCart2 = () => {
    console.log("ggprod", product);
    userCart2(product, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        localStorage.setItem("cart", JSON.stringify(res));

        dispatch({
          type: "ADD_TO_CART",
          payload: res,
        });
      })
      .catch((err) => console.log("cart save err", err));
  };

  const handleAddToCart = () => {
    // create cart array
    //let cart = [];

    if (typeof window !== "undefined") {
      // if (localStorage.getItem("cart")) {
      //   cart = JSON.parse(localStorage.getItem("cart"));
      // }
      console.log("llmf", product);

      // let x={};
      // x.

      // push new product to cart
      cart.push({
        ...product, //prod
        count: 1, //with count variable 1
      });

      // remove duplicates from cart
      let uniquecart = _.uniqWith(cart, _.isEqual);

      // console.log('unique', unique)
      // localStorage.setItem("cart", JSON.stringify(uniquecart));
      setTooltip("Added");

      // add to reeux state

      userCart(uniquecart, user.token)
        .then((res) => {
          console.log("CART POST RES", res);
          console.log("POST RES", uniquecart);
          if (res.data.ok) console.log("CART POST RES success");
          //history.push("/checkout");
        })
        .catch((err) => console.log("cart save err", err));

      dispatch({
        type: "ADD_TO_CART",
        payload: uniquecart,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div
        className="col-md-5"
        style={{
          backgroundColor: "blue",
          marginTop: "-15px",
          marginLeft: "50px",
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        {/* <p> Hello ji </p> */}

        <div
          style={{
            backgroundColor: "green",
            // height: "1680px",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            //  marginLeft: "50px",

            // padding: "5px",
            //width: "580px",
            //  marginBottom: "5px",
          }}
          className="carousel-container"
        >
          {images && images.length ? (
            //use crousel to show images images if>=1
            <Carousel
              showArrows={true}
              // renderIndicator={}
              autoPlay
              infiniteLoop
              // style={{
              //   //  backgroundColor: "pink",
              //   //  height: "380px",
              //   //  marginTop: "15px",
              //   padding: "115px",
              //   // marginBottom: "5px",
              // }}
            >
              {images &&
                images.map((i) => (
                  <div
                    style={{
                      backgroundColor: "orange",
                      // height: "520px",
                      // padding: "16px",
                      // paddingBottom: "20px",
                      width: "430px",
                      borderRadius: "8px",
                      // display: "flex",
                      // alignItems: "center",
                      // justifyContent: "center",
                    }}
                  >
                    <img
                      src={i.url}
                      key={i.public_id}
                      // className="h-full bg-black "
                      //style={{ height: "200px", padding: "10px" }}
                    />
                  </div>
                ))}
            </Carousel>
          ) : (
            <Card cover={<img src={asas} className="mb-3 card-image" />}></Card> //else show default image
          )}
        </div>

        {/* <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            learn more about this product.
          </TabPane>
        </Tabs> */}
      </div>

      <div className="col-md-6  " style={{ backgroundColor: "black" }}>
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? ( //if product has rating calculate avg of that and show that much star here
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart2}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                Cart
              </a>
            </Tooltip>,

            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,

            //aother rating popump using parent on star click here pass same to new child starrating do task there
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          {/* //show details of this product */}
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
