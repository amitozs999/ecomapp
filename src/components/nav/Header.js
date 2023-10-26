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
    if (user && user.token) {
      getUserCart(user.token).then((res) => {
        console.log(
          "get user cart res from back",
          JSON.stringify(res.data, null, 4)
        );
        // console.log(res.data.products.length + "lll");
        // setProducts(res.data.products);
        setTotal(res.data.products.length);

        let cart = [];
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
            cart.push({
              ...prod, //prod
              count: 1, //with count variable 1
            });
          });

          dispatch({
            type: "ADD_TO_CART",
            payload: res,
          });
        }
      });

      // console.log(productsx);
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
    width: "25%",
    height: "25px",
    objectFit: "cover",
  };
  return (
    <header>
      <div class="flex-container">
        <div className="logodiv">
          <a>
            <img
              className="logo"
              src={asas}
              onClick={logoclick}
              style={imageStyle}
            />
          </a>
          <p className="logotext"> Amaz Shop</p>

          {/* <Link to="/" onClick={logoclick}>
            AZ Store
          </Link> */}
        </div>

        <div className="mainmenudiv">
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="header-item"
          >
            {/* <Item icon={<ShopTwoTone />}>AZ Store</Item> */}
            {/* <Item key="home" icon={<ShopTwoTone />}>
              <Link to="/">AZ Store</Link>
            </Item> */}

            <Item
              key="shop"
              icon={<ShoppingOutlined />}
              style={{ marginRight: "145px", marginLeft: "40px" }}
            >
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">What's New</Link>
            </Item>

            <Search style={{ marginRight: "auto" }} />
            {/* <div className="flex-grow bg-slate-1900"> */}

            {/* <div className="search-div"> */}

            {/* </div> */}

            {user && (
              <SubMenu
                icon={<UserOutlined />}
                title={user.email && user.email.split("@")[0]}
                style={{ marginLeft: "60px" }}
              >
                {user && user.role === "subscriber" && (
                  <Item icon={<DashboardOutlined />}>
                    <Link to="/user/history">Dashboard</Link>
                  </Item>
                )}

                {user && user.role === "admin" && (
                  <Item icon={<DashboardOutlined />}>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </Item>
                )}

                <Item icon={<LogoutOutlined />} onClick={logout}>
                  Logout
                </Item>
              </SubMenu>
            )}
            {!user && (
              <Item
                key="register"
                icon={<UserAddOutlined />}
                style={{ marginLeft: "20px" }}
              >
                <Link to="/register">Register</Link>
              </Item>
            )}

            {!user && (
              <Item key="login" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Item>
            )}

            <Item
              key="cart"
              icon={<ShoppingCartOutlined />}
              //  style={{ marginLeft: "auto" }}
            >
              <Link to="/cart">
                Cart
                <Badge
                  className="badge-pad"
                  count={total}
                  // count={cart.products.length}
                  offset={[9, 0]}
                ></Badge>
              </Link>
            </Item>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
