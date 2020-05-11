import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { Description } from "./styles";

const TableDescription = ({ children, headers, ...props }) => {
  return (
    <Description {...props} headers={headers}>
      {children}
    </Description>
  );
};

TableDescription.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TableDescription.defaultProps = {
  headers: [],
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.headers, nextProps.headers);

export default React.memo(TableDescription, areEqual);
