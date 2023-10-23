import React, { useState } from "react";
import { Card, Descriptions, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import asas from "../../images/asas.jpg";
import noimage from "../../images/no_image.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import "./index.scss";
const { Meta } = Card;
//for non admins only can view it noedit/update

//shown on home page
const ProductCardNewHoriz = ({ product }) => {
  const history = useHistory();
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // destructure
  const { images, title, description, slug, price, color, ratings } = product;

  var xx = title;
  if (title.length > 21) xx = title.substring(0, 21) + "..";

  const handleAddToCart = () => {
    // create cart array
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // push new product to cart
      cart.push({
        ...product, //prod
        count: 1, //with count variable 1
      });

      // remove duplicates from cart
      let uniquecart = _.uniqWith(cart, _.isEqual);

      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(uniquecart));
      setTooltip("Added");

      // add to reeux state
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

  return (
    <div
      //height="600px"
      id={"u"}
      className=" bg-blue-600 h-72 my-1 mx-1 flex "
    >
      <div className="w-60 bg-red-500 my-2 mx-2 flex: 1 ">
        <img
          width={"240px"}
          //height={"17rem"}
          className="h-64   my-2 "
          //className="mb-2 py-2 imzprod zom "
          src={images && images.length ? images[0].url : noimage}
          onClick={() => history.push(`/product/${slug}`)}
        />
      </div>

      {/* <div className="flex-1 bg-red-800 py-2 px-2">
        <div className="flex flex-row bg-gray-700 py-5 px-5 h-full">
          <div className="flex w-60 bg-neutral-400 h-6"></div>

          <div className=" flex w-8 bg-slate-600 h-7"></div>
        </div>
      </div> */}

      <div className=" cc   bg-red-800 my-3 mx-3">
        <div className="flex justify-between w-full h-full p-3">
          {/* <div className="flex   bg-gray-700 py-5 px-5 h-full"> */}

          <div className=" flex flex-col     w-full h-full">
            <h1 className="bg-white text-red-700 ">{title}</h1>
            <h1 className="bg-white text-red-700 ">₹{price}.00</h1>
            <h5 className="bg-white text-red-700 ">{description} </h5>
            {product && product.ratings && product.ratings.length > 0 ? ( //show if this prod has rating avg wali
              showAverage(product)
            ) : (
              <div className="text-center pt-1 pb-3">No rating yet</div>
            )}
          </div>

          {/* <div className=" w-full bg-neutral-400 h-32"></div> */}

          <div className="w-28 bg-green-400 h-12 ml-5 mr-4  "> bibh</div>

          {/* </div> */}
        </div>
      </div>

      {/* <img
        height={"210px"}
        width={"200px"}
        className="mb-2 py-2 imzprod zom "
        src={images && images.length ? images[0].url : noimage}
        onClick={() => history.push(`/product/${slug}`)}
      > */}
      {/* <Link to={`/product/`}></Link> */}
      {/* </img> */}
      {/* <h5 class="txtcategbottomm"> {xx}</h5>
      <p className="txtcategbottomm2">₹ {price}</p> */}

      {/* <button class="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button> */}
    </div>
  );
};

export default ProductCardNewHoriz;
