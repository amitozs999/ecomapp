import React, { useEffect, useState } from "react";

import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import asas from "../../images/asas.jpg";
import ProductListItems from "./ProductListItems";
import { StarOutlined } from "@ant-design/icons";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/ratingsinglepage";

import { addToWishlist } from "../../functions/user";
import { HeartFilled } from "@ant-design/icons";

import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { getUserCart, emptyUserCart } from "../../functions/user";
import { userCart } from "../../functions/user";
import noimage from "../../images/no_image.jpg";

import { getWishlist, removeWishlist } from "../../functions/user";
import { userCart2 } from "../../functions/user";
import "./index.scss";
const { TabPane } = Tabs;

// const SingleProduct = ({ product }) => {
//   const { title, images, description } = product; //fetch this prod details from props

// this is childrend component of Product page

const SingleProduct = ({
  product,
  onStarClick,
  star,
  isinwish,
  changeisinwish,
}) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const [wishlistt, setWishlist] = useState([]);
  const [ssrr, setssrr] = useState(false);
  const { user, cart, userwishlist } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const [productsx, setProducts] = useState([]);
  let history = useHistory();

  //const [sss, setsss] = useState(isinwish);
  console.log("vvvvvv isinwish come in sp", isinwish);

  const [iconColor, setIconColor] = useState(isinwish);

  console.log("vvv isinwish in sp page", isinwish);
  console.log("vvv isinwish ic in sp page", iconColor);

  // setIconColor(isinwish);

  // useEffect(() => {
  //   setIconColor(isinwish);
  // }, []);

  useEffect(() => {
    console.log("vvv CA,E HERE");
  }, [iconColor]);

  useEffect(() => {
    //setIconColor(isinwish);
  });
  useEffect(() => {
    console.log("vvvcol fill change" + product._id, iconColor);
  }, [iconColor]);

  // useEffect(() =>
  // {
  //   if(iconColor)
  //   {
  //     setIconColor(isinwish);
  //   }
  //   else
  //   {
  //     setCssClass("heart")
  //   }

  // },[iconColor])

  console.log("isinwish", isinwish);
  console.log("icn colr", iconColor);

  const {
    title,
    images,
    description,
    _id,
    slug,
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
    ratings,
  } = product;

  const [ratingtext, setratingtext] = useState(false);

  // console.log("ssssssuserwish", price);

  // console.log("ssssssuserwish", userwishlist);
  // userwishlist.data.wishlist.some((w) => {
  //   // if (w._id.toString() === product._id.toString())
  //   //   console.log("ssssssuserwish true");
  //   // console.log("ssssssuserwish", _id);
  // });

  useEffect(() => {
    if (user) {
      let ssr =
        user &&
        ratings !== undefined &&
        ratings.some((w) => {
          if (w.postedBy.toString() === user._id.toString()) return true;
        });
      setratingtext(ssr);

      console.log("nnn rating", ratings);
      console.log("nnn is in rating", ssr);
      console.log("nnn curr user", user);
    }
  }, [user]);

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

  useEffect(() => {
    // if (
    //   (userwishlist.data !== undefined && !userwishlist.data.wishlist.length) ||
    //   !localStorage.getItem("wishlist")
    // ) {

    console.log("vvv loading wishlist again2"); //
    loadWishlist();

    // }
    // // console.log("ll", userwishlist);
    // setWishlist(userwishlist.data.wishlist);
    //
    // console.log("ssssssuserwish2", wishlistt);
  }, [user]);

  // const loadWishlist = () => {
  //   console.log("ZZZ", wishlistt);
  //   if (user && user.token) {
  //     getWishlist(user.token).then((res) => {
  //       console.log("gg wishlis", res);
  //       console.log("gg wishlisvv", res.data.wishlist);
  //       setWishlist(res.data.wishlist);
  //       console.log("ZZZ", wishlistt);
  //       console.log("ZZZuser", userwishlist);

  //       if (typeof window !== "undefined") {
  //         localStorage.setItem("wishlist", JSON.stringify(res));
  //       }
  //       console.log(
  //         "ssssssuserwish3",
  //         JSON.parse(localStorage.getItem("wishlist"))
  //       );

  //       dispatch({
  //         type: "ADD_TO_WISHLIST",
  //         payload: res,
  //       });

  //       // let ssr =
  //       //   userwishlist.data !== undefined &&
  //       //   userwishlist.data.wishlist.some((w) => {
  //       //     if (w._id.toString() === product._id.toString()) return true;
  //       //   });

  //       // setssrr(ssr);
  //       // setIconColor(ssr);

  //       // if (localStorage.getItem("wishlist")) {
  //       //   cart = JSON.parse(localStorage.getItem("cart")); //local storage se cart nikal liya
  //       // }
  //     });
  //   }
  // };

  // let ssr =
  //   userwishlist.data !== undefined &&
  //   userwishlist.data.wishlist.some((w) => {
  //     if (w._id.toString() === product._id.toString()) return true;
  //   });

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

  const handleAddToWishlist = (e) => {
    //e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      // history.push("/user/wishlist");
      setIconColor(!iconColor);
      loadWishlist();
    });
  };

  const handleRemove = (productId) => {
    // props.changewishset();

    removeWishlist(productId, user.token).then((res) => {
      console.log("REMOVED FROM WISHLIST", res.data);
      //e.preventDefault();
      toast.info("Removed from wishlist");
      setIconColor(!iconColor);
      loadWishlist();
    });
  };

  const loadWishlist = () => {
    console.log("ZZZ", wishlistt);
    if (user && user.token) {
      getWishlist(user.token).then((res) => {
        console.log("gg wishlis", res);
        console.log("vvv gg wishlisvv", res.data.wishlist);
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

        // res.data !== undefined &&
        //   res.data.wishlist.some((w) => {
        //     if (w._id.toString() === product._id.toString()) setIconColor(true);
        //   });

        // if (localStorage.getItem("wishlist")) {
        //   cart = JSON.parse(localStorage.getItem("cart")); //local storage se cart nikal liya
        // }
      });
    }
  };
  return (
    <>
      <div
        className="col-md-5 leftdivsingleprod"
        // style={{
        //   backgroundColor: "blue", //
        //   marginTop: "-15px",
        //   marginLeft: "50px",
        //   // alignItems: "center",
        //   // justifyContent: "center",
        // }}
      >
        <div
          style={{
            //    backgroundColor: "green",//
            height: " 590px",
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
                      //     backgroundColor: "orange",//
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

          {/* <p> Hello ji </p> */}
        </div>

        {/* <p> Hello ji </p> */}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-6  " style={{ backgroundColor: " " }}>
        {/* <div className="w-44 h-52  mx-1 my-1 px-1 py-1 flex: 1 ">
          <img
            width={"150px"}
            //height={"17rem"}
            className="h-40 addcart "
            //className="mb-2 py-2 imzprod zom "
            src={images && images.length ? images[0].url : noimage}
            onClick={() => history.push(`/product/${slug}`)}
          />
        </div> */}

        {/* <div className="flex-1 bg-red-800 py-2 px-2">
        <div className="flex flex-row bg-gray-700 py-5 px-5 h-full">
          <div className="flex w-60 bg-neutral-400 h-6"></div>

          <div className=" flex w-8 bg-slate-600 h-7"></div>
        </div>
      </div> */}

        <div
          className=" cc    mx-1 my-1 px-1 py-1 "
          style={{
            backgroundColor: " ",
            height: "500px",
            // marginTop: "50px",
            //  paddingTop: "30px",
          }}
        >
          <div className="flex justify-between w-full h-full  ">
            {/* <div className="flex   bg-gray-700 py-5 px-5 h-full"> */}

            <div className=" flex flex-col     w-full h-full">
              <div className="row" style={{ backgroundColor: " " }}>
                <h1
                  className="bg-white    txtcategbottommhoriztitlesingle"
                  style={{
                    marginTop: "20px",
                    marginLeft: "27px",
                    width: "450px",
                  }}
                  //onClick={() => history.push(`/product/${slug}`)}
                >
                  {title}
                </h1>
                <div
                  className="w-28    h-12 ml-10 mr-4 mt-1 text-right"
                  style={{
                    // backgroundColor: "black",
                    width: "70px",
                    paddingTop: "20px",
                    paddingRight: "20px",
                  }}
                >
                  {/* // {isinwish || iconColor ? ( //show if this prod has rating avg wali */}
                  {iconColor ? (
                    <HeartFilled
                      style={{ color: "#FF6161FF", fontSize: "25px" }}
                      onClick={() => {
                        console.log(
                          "vvvvfilled tha and icon col was",
                          iconColor
                        );
                        // setIconColor(false);

                        // setssrr(!ssrr);
                        // ssr = !ssr;
                        // isinwish = false;
                        handleRemove(product._id);
                      }}
                      Wishlist
                    />
                  ) : (
                    <HeartOutlined
                      style={{ color: "#A8A7A8FF", fontSize: "25px" }}
                      onClick={() => {
                        if (user) {
                          //  setIconColor(!iconColor);
                          //addToWishlist(product._id, user.token);
                          console.log("unfilled");
                          //   ssr = !ssr;
                          //  setssrr(!ssrr);
                          //   isinwish = true;
                          handleAddToWishlist(product._id);
                        } else {
                          toast.info("Please login to wishlist a product !");
                        }
                      }}
                    />
                  )}

                  {/* {" Wishlist"} */}
                </div>
              </div>

              {product && product.ratings && product.ratings.length > 0 ? ( //show if this prod has rating avg wali
                showAverage(product)
              ) : (
                <p className=" ml-3  txtcategbottommhorizratesingle">
                  First one to rate
                </p>
              )}

              <h1
                className="bg-white txtcategbottommhorizpricesingle ml-3"
                style={{ marginBottom: "15px" }}
              >
                ₹{price}.00
              </h1>

              <h5 className="bg-white txtcategbottommhorizdescsingle mb-1 ml-3 mt-4">
                {description}{" "}
              </h5>
              <div
                className="row bg-white   mb-1 ml-1  mt-20 w-auto"
                style={{ marginTop: "40px", width: "300px" }}
              >
                <p className="bg-white txtcategbottommhorizdescsingle2  mb-1 ml-2">
                  {" • Category"}
                </p>

                <p
                  className="bg-white txtcategbottommhorizdescsingle  mb-1 ml-2"
                  style={{ color: "black" }}
                >
                  <Link
                    to={`/category/${category && category.slug}`}
                    className="label label-default label-pill pull-xs-right"
                  >
                    {category && category.name}
                  </Link>
                </p>
              </div>
              <div
                className="row bg-white   mb-1 ml-1   w-auto"
                style={{ width: "300px", height: "30px" }}
              >
                <p className="bg-white txtcategbottommhorizdescsingle2  mb-1 ml-2">
                  {" • Sub Category"}
                </p>
                <p
                  className="bg-white txtcategbottommhorizdescsingle  mb-1 ml-2"
                  style={{ color: "black" }}
                >
                  {subs &&
                    subs.map((s) => (
                      <Link
                        key={s._id}
                        to={`/sub/${s.slug}`}
                        className="label label-default label-pill pull-xs-right"
                      >
                        {/* <p
                          className="bg-white txtcategbottommhorizdescsingle    ml-2"
                          style={{ color: "black" }}
                        > */}
                        {s.name}
                        {/* </p> */}
                      </Link>

                      // <p>{s.name}</p>
                    ))}
                </p>
              </div>
              <div
                className="row bg-white   mb-1 ml-1  w-auto"
                style={{ width: "300px" }}
              >
                <p className="bg-white txtcategbottommhorizdescsingle2  mb-1 ml-2">
                  {" • Brand"}
                </p>
                <p
                  className="bg-white txtcategbottommhorizdescsingle  mb-1 ml-2"
                  style={{ color: "black" }}
                >
                  {brand}
                </p>
              </div>
              <div
                className="row bg-white   mb-1 ml-1    w-auto"
                style={{ width: "300px" }}
              >
                <p className="bg-white txtcategbottommhorizdescsingle2  mb-1 ml-2">
                  {" • Color"}
                </p>
                <p
                  className="bg-white txtcategbottommhorizdescsingle  mb-1 ml-2"
                  style={{ color: "black" }}
                >
                  {color}
                </p>
              </div>
              <div
                className="row bg-white   mb-1 ml-1    w-auto"
                style={{ width: "300px", marginBottom: "60px" }}
              >
                <p className="bg-white txtcategbottommhorizdescsingle2  mb-1 ml-2">
                  {" • Shipping"}
                </p>
                <p
                  className="bg-white txtcategbottommhorizdescsingle  mb-1 ml-2"
                  style={{ color: "black" }}
                >
                  {shipping}
                </p>
              </div>

              <div className="row  ml-1  " style={{ marginTop: "20px" }}>
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
                    width: "160px",
                    borderRadius: "4px",
                    fontSize: "17px",
                    textAlign: "center",
                    marginTop: "150px",
                  }}
                  //product/nike-mens-nike-air-max

                  // transition-all duration-300 shadow-lg 2xl:mt-2
                  className="  py-2        mb-2 ml-2 mt-2
            font-semibold cartbutton"
                >
                  <ShoppingCartOutlined /> {"  "} &nbsp; Add to cart
                </a>

                <a
                  // onClick={handleAddToCart2}

                  onClick={() => {
                    if (!user) {
                      toast.info("Please login to Leave rating !");
                    }
                  }}
                  style={{
                    backgroundColor: "#FFE3E8FF",
                    color: "#FF644FFF",
                    width: "160px",
                    borderRadius: "4px",
                    fontSize: "17px",
                    textAlign: "center",
                    marginTop: "150px",
                    marginLeft: "20px",
                  }}
                  //product/nike-mens-nike-air-max

                  // transition-all duration-300 shadow-lg 2xl:mt-2
                  className="  py-2        mb-2  mt-2
            font-semibold cartbutton"
                >
                  {/* <HeartOutlined
                  className="text-info"
                  style={{ color: "#FF644FFF !important" }}
                /> */}
                  {/* <StarOutlined className="text-danger" /> &nbsp; Leave rating */}
                  <RatingModal ratingtext={ratingtext}>
                    <StarRating
                      // borderRadius="7px"
                      starDimension="39px"
                      name={_id}
                      numberOfStars={5}
                      rating={star}
                      changeRating={onStarClick}
                      isSelectable={true}
                      starRatedColor="#FAE898FF"
                      starHoverColor="#FAE898FF"
                    />
                  </RatingModal>
                </a>

                {/* // <div className="bg-slate-600" style={{ backgroundColor: "gray" }}> */}

                {/* <a
                  //onClick={handleAddToCart2}

                  onClick={() => {
                    if (user) {
                      handleRemove();
                    } else {
                      toast.info("Please login to Add product to cart !");
                    }
                  }}
                  style={{
                    backgroundColor: "#5199DBFF",
                    color: "white",
                    width: "160px",
                    borderRadius: "4px",
                    fontSize: "17px",
                    textAlign: "center",
                    marginTop: "150px",
                  }}
                  //product/nike-mens-nike-air-max

                  // transition-all duration-300 shadow-lg 2xl:mt-2
                  className="  py-2        mb-2 ml-2 mt-2
            font-semibold cartbutton"
                >
                  <RatingModal>
                    <StarRating
                      name={_id}
                      numberOfStars={5}
                      rating={star}
                      changeRating={onStarClick}
                      isSelectable={true}
                      starRatedColor="red"
                    />
                  </RatingModal>
                  {/* </div> */}
                {/* </a> */}
              </div>
            </div>

            {/* <div className=" w-full bg-neutral-400 h-32"></div> */}

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

      {/* <h1 className="bg-info p-3">{title}</h1> */}

      {/* {product && product.ratings && product.ratings.length > 0 ? ( //if product has rating calculate avg of that and show that much star here
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )} */}

      {/* <Card
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
        > */}
      {/* //show details of this product */}
      {/* <ProductListItems product={product} /> */}
      {/* </Card> */}
    </>
  );
};

export default SingleProduct;
