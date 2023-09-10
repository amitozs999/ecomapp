import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />; // ..rest pass hogya secure route now go to jha jana tha originally
  //else go to mentioned new route LoadingToRedirect  wha se vaps kai hor bcoz not passed role condition
};

export default UserRoute;
