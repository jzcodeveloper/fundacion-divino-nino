import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

const Content = ({ style, children }) => (
  <Container style={style}>{children}</Container>
);

Content.propTypes = {};

Content.defaultProps = {};

export default Content;
