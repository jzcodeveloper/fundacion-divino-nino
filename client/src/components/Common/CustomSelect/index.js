import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { Container, Select, Option } from "./styles";

const CustomSelect = ({ autoFocus, options, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current.focus();
  }, []);

  return (
    <Container>
      <Select ref={inputRef} {...props}>
        {options.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Select>
    </Container>
  );
};

CustomSelect.propTypes = {};

CustomSelect.defaultProps = {};

export default CustomSelect;
