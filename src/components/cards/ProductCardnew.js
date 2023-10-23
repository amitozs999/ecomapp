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
import "./index.scss";
const { Meta } = Card;
//for non admins only can view it noedit/update

//shown on home page
const ProductCardNew = ({ product }) => {
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
      className="itemsprod h-56"
      onClick={() => history.push("d")}
      //   onMouseOver={handleMouseOver}
      //   onMouseOut={() => setIsHovered(null)}
    >
      <img
        height={"210px"}
        width={"200px"}
        className="mb-2 py-2 imzprod"
        //src={imgg}
        //src="images/prod01.jpg"
        src={images && images.length ? images[0].url : noimage}
        // src="images/prod01.jpg" to refer from public/images/prod01    images/+{prod01.jpg}
      >
        {/* <Link to={`/product/`}></Link> */}
      </img>
      <h5 class="txtcategbottomm"> {xx}</h5>
      <p className="txtcategbottomm2">₹ {price}</p>
      {/* <span class="price">$19.99</span> */}
      <button class="add-to-cart">Add to Cart</button>

      {/* <h2>Product Name</h2> */}
      {/* <p>Product Description</p>
      <span class="price">$19.99</span>
      <button class="add-to-cart">Add to Cart</button> */}
    </div>
    // <>
    //   {product && product.ratings && product.ratings.length > 0 ? ( //show if this prod has rating avg wali
    //     showAverage(product)
    //   ) : (
    //     <div className="text-center pt-1 pb-3">No rating yet</div>
    //   )}

    //   <Card
    //     cover={
    //       <img
    //         src={images && images.length ? images[0].url : asas}
    //         style={{ height: "150px", objectFit: "cover" }}
    //         className="p-1"
    //       />
    //     }
    //     actions={[
    //       <Link to={`/product/${slug}`}>
    //         <EyeOutlined className="text-warning" /> <br /> View Product
    //       </Link>,
    //       <Tooltip title={tooltip}>
    //         <a onClick={handleAddToCart}>
    //           <ShoppingCartOutlined className="text-danger" /> <br /> Add to
    //           Cart
    //         </a>
    //       </Tooltip>,
    //     ]}
    //   >
    //     <Meta
    //       title={title}
    //       description={`${description && description.substring(0, 40)}...`}
    //     />
    //   </Card>
    // </>
  );
};

export default ProductCardNew;
