import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  //checking if anything present in cart redux state
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [total, setTotal] = useState(0);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // if (user && user.token) {
    //   setTotal(1);
    //   // console.log(productsx);
    // }
    // if (!cart.length) {
    //   console.log("prods after ref no len");
    // } else {
    //   setProducts(cart.data.products);
    //   console.log("prods after ref yes len");
    // }
    // console.log("prods after ref", products);
  }, [cart]);

  console.log("crt", cart);
  console.log("usr", user);

  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));

    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems3 = () => {
    //  console.log("ss", cart.data.products);
    //if (products) {
    //cart.data.products;

    cart.data.products.map((prod) => (
      <div>
        <p>
          htn
          {/* {prod.title} x {prod.count} = ${prod.price * prod.count} */}
        </p>
      </div>
    ));
    //  }
  };

  const showCartItems2 = () =>
    cart.data.products.map((prod) => (
      <div>
        <p>
          {prod.title} x {prod.count} = ${prod.price * prod.count}
        </p>
      </div>
    ));

  //creating a table to show cart items
  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {/* //each row me har cart ke details */}

      {cart.data.products.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.data.products ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>

        {/* //to show total summary of card products in right side col */}

        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>

          {!cart.data.products ? <p>No products in cart.</p> : showCartItems2()}

          <hr />
          {/* Total: <b>${getTotal()}</b> */}
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
