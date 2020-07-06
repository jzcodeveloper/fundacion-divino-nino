import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { selectUser } from "../../store/user/selectors";

const PrivateRoute = ({ ...props }) => {
  const user = useSelector(selectUser);

  return user ? <Route {...props} /> : <Redirect to="/auth/login" />;
};

export default PrivateRoute;
