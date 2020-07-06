import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { selectUser } from "../../store/user/selectors";

const PublicRoute = ({ ...props }) => {
  const user = useSelector(selectUser);

  return user ? <Redirect to="/desk" /> : <Route {...props} />;
};

export default PublicRoute;
