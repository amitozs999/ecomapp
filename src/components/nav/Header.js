import React, { useState, useEffect } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  DashboardOutlined,
  ShopTwoTone,
} from "@ant-design/icons";

import asas from "./234.png";
import asas3 from "./icon.svg";

import "./header.scss";

import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserCart } from "../../functions/user";

import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  const [total, setTotal] = useState(0);

  let dispatch = useDispatch();

  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  useEffect(() => {
    console.log("crat in head2", cart);

    if (typeof window !== "undefined") {
      if (!localStorage.getItem("cart")) {
        if (user && user.token) {
          getUserCart(user.token).then((res) => {
            // console.log("crat in head api 1", cart);
            console.log(
              "get user cart res from back",
              JSON.stringify(res.data, null, 4)
            );
            // console.log(res.data.products.length + "lll");
            // setProducts(res.data.products);
            if (res.data) {
              setTotal(res.data.products.length);
            }

            let cart1 = [];
            // let cart = res.data.products;
            // console.log(cart[0].product.title + "lllp");

            if (res.data) {
              let x = res.data.products;
              x.forEach((prod) => {
                // if (item.name === itemToCheck.name) {
                //   addCountToItem({ ...itemToCheck, count: itemToCheck.count + 1 });
                // } else if (item.name !== itemToCheck.name) {
                //   addToCart({ ...item, count: 1 });
                // }

                console.log("vv", prod);
                cart1.push({
                  ...prod, //prod
                  count: res.data.products.count, //with count variable 1
                });
              });

              dispatch({
                type: "ADD_TO_CART",
                payload: res,
              });

              localStorage.setItem("cart", JSON.stringify(res));
            }
          });

          // console.log(productsx);
        }
      }
    }
  }, [user]);

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    setTotal(0);

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    localStorage.removeItem("cart");
    history.push("/login");
  };

  const handleClick = (e) => {
    // console.log(e.key);

    setCurrent(e.key);
  };

  const logoclick = (e) => {
    // console.log(e.key);

    setCurrent();
    history.push("/");
  };
  const imageStyle = {
    width: "21%",
    height: "18px",
    objectFit: "cover",
    color: "red",
  };
  return (
    <header style={{ width: "100vw", overflowX: "hidden" }}>
      {" "}
      {/* // flex container( logodiv     mainmenu div( items  ) ) */}{" "}
      <div class="flex-container md:fixed   ">
        <div className="logodiv" onClick={logoclick}>
          <a>
            <img className="logo" src={asas3} />{" "}
          </a>{" "}
          {/* <p className="logotext"> Shop Now </p>{" "} */}{" "}
          {/* <Link to="/" onClick={logoclick}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    AZ Store
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </Link> */}{" "}
        </div>{" "}
        <div className="searchbardiv">
          <Search />{" "}
        </div>{" "}
        <div className="mainmenudiv">
          <Menu
            //  overflowedIndicator={false}
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="header-item"
            width="100%"
            //    style={{ backgroundColor: "black" }}
          >
            {/* <Item icon={<ShopTwoTone />}>AZ Store</Item> */}{" "}
            {/* <Item key="home" icon={<ShopTwoTone />}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <Link to="/">AZ Store</Link>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </Item> */}{" "}
            <Item
              key="shop"
              className="itemwhatsnew"
              icon={<ShoppingOutlined />}
              style={{ backgroundColor: "gray" }}
              //   style={{ marginRight: " 45px", marginLeft: "40px" }}
            >
              {/* //<Link to="/shop" className="header-item"> */}{" "}
              <Link to="/shop"> What 's New</Link>{" "}
            </Item>{" "}
            {/* <div className="flex-grow bg-slate-1900"> */}{" "}
            {/* <div className="search-div"> */} {/* </div> */}{" "}
            {user && (
              <SubMenu
                icon={<UserOutlined />}
                title={user.email && user.email.split("@")[0]}
                style={{ marginLeft: "60px" }}
              >
                {user && user.role === "subscriber" && (
                  <Item icon={<DashboardOutlined />}>
                    <Link to="/user/history"> Dashboard </Link>{" "}
                  </Item>
                )}{" "}
                {user && user.role === "admin" && (
                  <Item icon={<DashboardOutlined />}>
                    <Link to="/admin/dashboard"> Dashboard </Link>{" "}
                  </Item>
                )}{" "}
                <Item icon={<LogoutOutlined />} onClick={logout}>
                  Logout{" "}
                </Item>{" "}
              </SubMenu>
            )}{" "}
            {!user && (
              <Item
                key="register"
                className="itemregister"
                icon={<UserAddOutlined />}
                //  style={{ marginLeft: "20px" }}
                style={{ backgroundColor: "green" }}
              >
                <Link to="/register"> Register </Link>{" "}
              </Item>
            )}{" "}
            {!user && (
              <Item
                key="login"
                className="itemlogin"
                icon={<LoginOutlined />}
                style={{ backgroundColor: "yellowgreen" }}
              >
                <Link to="/login"> Login </Link>{" "}
              </Item>
            )}{" "}
            {/* {user && (
                                                  <Item
                                                    key="cart"
                                                    className="itemcart"
                                                    icon={<ShoppingCartOutlined />}
                                                    //  style={{ marginLeft: "auto" }}
                                                    style={{ backgroundColor: "gold" }}
                                                  >
                                                    <Link to="/cart">
                                                      Cart{" "}
                                                      <Badge
                                                        className="badge-pad"
                                                        // count={total}
                                                        //count={cart.data.products.length}
                                                        count={
                                                          cart.data == undefined || !cart.data.products || !user
                                                            ? ""
                                                            : cart.data.products.length
                                                        }
                                                        offset={[9, 0]}
                                                      ></Badge>{" "}
                                                    </Link>{" "}
                                                  </Item>
                                                )}{" "} */}{" "}
          </Menu>{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
};

export default Header;
