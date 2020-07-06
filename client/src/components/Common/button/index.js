import React from "react";
import PropTypes from "prop-types";

import { Button } from "./styles";

const CustomButton = (props) => {
  return <Button type="button" {...props}></Button>;
};

CustomButton.defaultProps = {
  bgColor: "#f0f4f7",
  color: "#555555",
};

export default CustomButton;
