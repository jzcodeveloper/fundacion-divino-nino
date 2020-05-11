import React from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { Container, StyledLink } from "./styles";

const TabItem = ({ caption, link, active }) => {
  return (
    <Container active={active}>
      <StyledLink to={link}>{caption}</StyledLink>
    </Container>
  );
};

TabItem.propTypes = {
  caption: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

TabItem.defaultProps = {
  caption: "",
  link: "",
  active: false,
};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(TabItem, areEqual);
