import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const AnimatedSwitch = ({ children }) => {
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup style={{ flex: "auto", position: "relative" }}>
          <CSSTransition
            key={location.pathname}
            timeout={300}
            classNames="page"
          >
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    ></Route>
  );
};

AnimatedSwitch.propTypes = {};

AnimatedSwitch.defaultProps = {};

export default AnimatedSwitch;
