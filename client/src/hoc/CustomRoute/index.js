import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { selectUser } from "../../store/user/selectors";

import AnimatedRoute from "../AnimatedRoute";

const CustomRoute = ({ component: Component, role, animated, ...props }) => {
  const user = useSelector(selectUser);

  const render = (otherProps) => {
    if (!role) {
      if (user) {
        if (user.role === "admin") return <Redirect to="/dashboard" />;
        if (user.role === "contributor")
          return <Redirect to="/tasks/overview" />;
      } else {
        return <Component {...otherProps} />;
      }
    }

    if (!user) return <Redirect to="/login" />;

    if (role === user.role) return <Component {...otherProps} />;

    if (role !== user.role) {
      if (role === "admin") return <Redirect to="/tasks/overview" />;
      if (role === "contributor") return <Redirect to="/dashboard" />;
    }
  };

  return animated ? (
    <AnimatedRoute {...props} render={render} />
  ) : (
    <Route {...props} render={render} />
  );
};

CustomRoute.propTypes = {};

CustomRoute.defaultProps = {};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.location.pathname, nextProps.location.pathname);

export default React.memo(CustomRoute, areEqual);
