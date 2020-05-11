import React from "react";
import { Route } from "react-router-dom";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { Container } from "./styles";

const AnimatedRoute = (props) => {
  return (
    <Container>
      <Route {...props} />
    </Container>
  );
};

AnimatedRoute.propTypes = {};

AnimatedRoute.defaultProps = {};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.location.pathname, nextProps.location.pathname);

export default React.memo(AnimatedRoute, areEqual);
