import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Container, Slider, Messages, Left, Right } from "./styles";

const CustomSlider = ({ leftMessage, rightMessage, ...props }) => {
  return (
    <Container>
      <Slider type="range" {...props} />
      <Messages>
        <Left>{leftMessage}</Left>
        <Right>{rightMessage}</Right>
      </Messages>
    </Container>
  );
};

CustomSlider.propTypes = {
  leftMessage: PropTypes.string,
  rightMessage: PropTypes.string,
};

CustomSlider.defaultProps = {
  leftMessage: "",
  rightMessage: "",
};

export default CustomSlider;
