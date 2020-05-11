import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "./styles";

const CustomButton = (props) => {
  return <Button {...props}></Button>;
};

CustomButton.propTypes = {};

CustomButton.defaultProps = {};

export default CustomButton;
