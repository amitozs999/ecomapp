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

import "./header.css";

import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

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

  return (
    <header className="bg-slate-500">
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="header-item"
      >
        <Item key="home" icon={<ShopTwoTone />}>
          <Link to="/">Home</Link>
        </Item>

        <Item key="shop" icon={<ShoppingOutlined />}>
          {/* //<Link to="/shop" className="header-item"> */}
          <Link to="/shop">Shop</Link>
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

        <div className="search-div">
          <Search />
        </div>
      </Menu>
    </header>
  );
};

export default Header;
