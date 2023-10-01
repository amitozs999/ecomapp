import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  ShopTwoTone,
} from "@ant-design/icons";

import asas from "./234.png";

import "./header.scss";

import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  let dispatch = useDispatch();

  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
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
    <header className="bg-slate-500">
      <div class="flex-container">
        <div>
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

        <div>
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

            <Item key="shop" icon={<ShoppingOutlined />}>
              {/* //<Link to="/shop" className="header-item"> */}
              <Link to="/shop">What's New</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
              <Link to="/cart">
                Cart
                <Badge
                  className="badge-pad"
                  count={cart.length}
                  offset={[9, 0]}
                ></Badge>
              </Link>
            </Item>

            {user && (
              <SubMenu
                icon={<SettingOutlined />}
                title={user.email && user.email.split("@")[0]}
                style={{ marginRight: "auto" }}
              >
                {user && user.role === "subscriber" && (
                  <Item>
                    <Link to="/user/history">Dashboard</Link>
                  </Item>
                )}

                {user && user.role === "admin" && (
                  <Item>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </Item>
                )}

                <Item icon={<LogoutOutlined />} onClick={logout}>
                  Logout
                </Item>
              </SubMenu>
            )}
            {!user && (
              <Item key="register" icon={<UserAddOutlined />}>
                <Link to="/register">Register</Link>
              </Item>
            )}

            {!user && (
              <Item key="login" icon={<UserOutlined />}>
                <Link to="/login">Login</Link>
              </Item>
            )}
            {/* <div className="flex-grow bg-slate-1900"> */}

            {/* <div className="search-div"> */}
            <Search />
            {/* </div> */}
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
