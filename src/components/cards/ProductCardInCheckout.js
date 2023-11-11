import React from "react";
import ModalImage from "react-modal-image";
import asas from "../../images/asas.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

//each prod cart row
//image(clickable) - titile- brand -price - colors(changable) - count (editable)- shiping  -remove

const ProductCardInCheckout = (props) => {
  const p = props.p;

  const colors = [
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
    "Orange",
    "Grey",
    "Green",
  ];
  let dispatch = useDispatch();

  //color
  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart")); //local storage se cart nikal liya
      }

      cart.map((product, i) => {
        //now update color of this prod in cart item
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart)); //update cart in local storage

      //update cart redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  //quantity
  const handleQuantityChange = (e) => {
    props.changecartset();
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`); //not avaible that much
      return;
    }

    let cart1 = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart1 = JSON.parse(localStorage.getItem("cart"));
      }

      cart1.data.products.map((product, i) => {
        //update count in local storage
        if (product._id == p._id) {
          cart1.data.products[i].count = count;
        }
      });

      // var x=cart1.data.products.reduce((currentValue, nextValue) => {
      //   return currentValue + nextValue.count * nextValue.price;
      // }, 0);

      cart1.data.cartTotal = cart1.data.products.reduce(
        (currentValue, nextValue) => {
          return currentValue + nextValue.count * nextValue.price;
        },
        0
      );

      localStorage.setItem("cart", JSON.stringify(cart1)); //update cart in local storage

      //update cart in redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart1,
      });
    }
  };

  //remove
  const handleRemove = () => {
    // console.log(p._id, "to remove");

    props.changecartset();
    let cart1 = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart1 = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart1.data.products.map((product, i) => {
        if (product._id === p._id) {
          cart1.data.products.splice(i, 1); //will remove that prod obj from cart
        }
      });
      cart1.data.cartTotal = cart1.data.products.reduce(
        (currentValue, nextValue) => {
          return currentValue + nextValue.count * nextValue.price;
        },
        0
      );

      localStorage.setItem("cart", JSON.stringify(cart1));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart1,
      });
    }
  };

  return (
    //tablebody
    //tr  tc1-tc2

    <tbody>
      <tr>
        {/* //image */}
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.product.images.length ? (
              <ModalImage
                small={p.product.images[0].url}
                large={p.product.images[0].url}
              />
            ) : (
              <ModalImage small={asas} large={asas} />
            )}
          </div>
        </td>

        <td>{p.product.title}</td>

        <td>₹{p.price}</td>

        <td>{p.product.brand}</td>
        <td>{p.color}</td>

        {/* //color dropdown */}

        {/* //show prod count by default */}
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>

        <td className="text-center">
          {p.product.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>

        {/* //delete */}
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
