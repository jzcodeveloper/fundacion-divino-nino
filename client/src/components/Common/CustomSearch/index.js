import React, { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Container, Input, IconContainer, Icon } from "./styles";

const CustomSearch = ({ onClick, ...props }) => {
  const inputRef = useRef();

  const inputFocus = useCallback((e) => {
    inputRef.current.focus();
    onClick(e);
  }, []);

  return (
    <Container value={props.value}>
      <Input {...props} ref={inputRef} />
      <IconContainer onClick={inputFocus}>
        <Icon icon="search" fixedWidth />
      </IconContainer>
    </Container>
  );
};

CustomSearch.propTypes = {};

CustomSearch.defaultProps = {};

export default CustomSearch;
