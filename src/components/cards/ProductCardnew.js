import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import asas from "../../images/asas.jpg";
import noimage from "../../images/no_image.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { userCart2 } from "../../functions/user";
import "./index2.scss";
const { Meta } = Card;
//for non admins only can view it noedit/update

//shown on home page
const ProductCardNew = ({ product, type }) => {
  const history = useHistory();
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let mql = window.matchMedia("(max-width: 480px)");
  // destructure
  const { images, title, description, slug, price, color, ratings } = product;

  var xx = title;
  if (title.length > 21) xx = title.substring(0, 21) + "..";

  const handleAddToCart2 = () => {
    console.log("ggprod", product);
    toast.success("Product Added to card");
    userCart2(product, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        localStorage.setItem("cart", JSON.stringify(res));

        dispatch({
          type: "ADD_TO_CART",
          payload: res,
        });

        // console.log("POST RES", uniquecart);
        // if (res.data.ok) console.log("CART POST RES success");
        //history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

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
      id={"u"}
      className={type == "related" ? "proditems my-10" : "proditems"}
    >
      <img
        className=" imzprod prodzom " //
        //src={imgg}
        //src="images/prod01.jpg"
        src={images && images.length ? images[0].url : noimage}
        onClick={() => history.push(`/product/${slug}`)}
        // onClick={handleAddToCart}
        // src="images/prod01.jpg" to refer from public/images/prod01    images/+{prod01.jpg}
      ></img>

      <h5 class="txtcategbottommprod"> {xx}</h5>

      <p className="txtcategbottomm2prod">₹ {price}</p>

      <button
        class="add-to-cart-prod"
        onClick={() => {
          if (user) {
            handleAddToCart2();
          } else {
            toast.error("Please login to Add product to cart !");
          }
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCardNew;
