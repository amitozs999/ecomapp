import React, { useEffect, useState } from "react";
import { Card, Descriptions, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import asas from "../../images/asas.jpg";
import noimage from "../../images/no_image.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { addToWishlist } from "../../functions/user";
import { getWishlist, removeWishlist } from "../../functions/user";

import { useHistory } from "react-router-dom";
import "./index.scss";

import { HeartFilled } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { userCart2 } from "../../functions/user";

import { ToastContainer } from "react-toastify";

//for non admins only can view it noedit/update
const { Meta } = Card;
//shown on home page
const ProductCardNewHoriz = (props) => {
  const product = props.product;
  const listt = props.listt;

  const history = useHistory();
  const [tooltip, setTooltip] = useState("Click to add");

  const [ispres, setispres] = useState(false);

  // let {   user  = useSelector((state) => ({ ...state }));
  //console.log("listt passed", listt);

  // let x = listt.data.wishlist.map(
  //   (w) => w._id.toString() === product._id.toString()
  // );

  let ssr =
    listt.data !== undefined &&
    listt.data.wishlist.some((w) => {
      if (w._id.toString() === product._id.toString()) return true;
    });

  const [iconColor, setIconColor] = useState(ssr);

  //console.log("ddd", x);
  //console.log("ttt", ssr);

  //console.log("ff", x[0]);
  //setispres(x);
  //console.log("ff", ispres);
  useEffect(() => {
    console.log("col fill change" + product._id, iconColor);
  }, [iconColor]);
  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    //loadWishlist();
  }, []);

  // const loadWishlist = () =>
  //   getWishlist(user.token).then((res) => {
  //     console.log("gg");
  //     console.log(res.data.wishlist);
  //     setWishlist(res.data.wishlist);
  //   });

  const handleRemove = (productId) => {
    props.changewishset();

    removeWishlist(productId, user.token).then((res) => {
      console.log("REMOVED FROM WISHLIST", res.data);
      //e.preventDefault();
      toast.info("Removed from wishlist");
      //  loadWishlist();
    });
  };

  const handleAddToWishlist = (productId) => {
    props.changewishset();
    //e.preventDefault();
    addToWishlist(productId, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      // history.push("/user/wishlist");
    });
  };

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
      className="    my-1 mx-1 flex "
      style={{
        height: "178px",
      }}
    >
      <div className="w-44 h-52  mx-1 my-1 px-1 py-1 flex: 1 ">
        <img
          width={"150px"}
          //height={"17rem"}
          className="h-40 addcart "
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

      <div
        className=" cc  h-52  mx-1 my-1 px-1 py-1 "
        //style={{ backgroundColor: " " }}
      >
        <div className="flex justify-between w-full h-full  ">
          {/* <div className="flex   bg-gray-700 py-5 px-5 h-full"> */}

          <div className=" flex flex-col     w-full h-full">
            <h1
              className="bg-white  ml-1 mt-2 txtcategbottommhoriztitle"
              onClick={() => history.push(`/product/${slug}`)}
            >
              {title}
            </h1>
            {product && product.ratings && product.ratings.length > 0 ? ( //show if this prod has rating avg wali
              showAverage(product)
            ) : (
              <p className=" ml-2  txtcategbottommhorizrate">
                First one to rate
              </p>
            )}
            <h1 className="bg-white txtcategbottommhorizprice ml-2">
              ₹{price}.00
            </h1>
            <h5 className="bg-white txtcategbottommhorizdesc mb-1 ml-2">
              {description}{" "}
            </h5>
            <a
              //onClick={handleAddToCart2}

              onClick={() => {
                if (user) {
                  handleAddToCart2();
                } else {
                  toast.info("Please login to Add product to cart !");
                }
              }}
              style={{
                backgroundColor: "#5199DBFF",
                color: "white",
                width: "105px",
                borderRadius: "4px",
                fontSize: "12px",
                textAlign: "center",
              }}
              //product/nike-mens-nike-air-max

              // transition-all duration-300 shadow-lg 2xl:mt-2
              className="  py-2        mb-2 ml-2 mt-2
            font-semibold cartbutton"
            >
              Add to cart
            </a>
          </div>

          {/* <div className=" w-full bg-neutral-400 h-32"></div> */}

          <div className="w-28    h-12 ml-10 mr-4 mt-1 text-right">
            {iconColor ? ( //show if this prod has rating avg wali
              <HeartFilled
                style={{ color: "#FF6161FF", fontSize: "20px" }}
                onClick={() => {
                  console.log("filled tha and icon col was", iconColor);
                  setIconColor(!iconColor);

                  ssr = !ssr;
                  handleRemove(product._id);
                }}
              />
            ) : (
              <HeartOutlined
                style={{ color: "#A8A7A8FF", fontSize: "20px" }}
                onClick={() => {
                  if (user) {
                    setIconColor(!iconColor);
                    //addToWishlist(product._id, user.token);
                    console.log("unfilled");
                    ssr = !ssr;
                    handleAddToWishlist(product._id);
                    //  handleRemove(product._id);
                  } else {
                    toast.info("Please login to wishlist a product !");
                  }
                }}
              />
            )}
          </div>

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
