import React from "react";
import PropTypes from "prop-types";

import { Overlay, Container } from "./styles";

const Spinner = ({ overlayColor, spinnerColor }) => (
  <Overlay overlayColor={overlayColor}>
    <Container spinnerColor={spinnerColor} />
  </Overlay>
);

Spinner.propTypes = {
  overlayColor: PropTypes.string,
  spinnerColor: PropTypes.string,
};

Spinner.defaultProps = {
  overlayColor: "#eceff1",
  spinnerColor: "#666666",
};

export default Spinner;
