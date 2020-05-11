import React from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { Description, StyledLink } from "./styles";

const TableDescription = ({ link, children, headers, ...props }) => {
  return (
    <Description {...props} headers={headers}>
      {link ? <StyledLink to={link}>{children}</StyledLink> : children}
    </Description>
  );
};

TableDescription.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TableDescription.defaultProps = {
  link: "",
  headers: [],
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.headers, nextProps.headers);

export default React.memo(TableDescription, areEqual);
