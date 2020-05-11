import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { Header } from "./styles";

const TableHeader = ({ children, ...props }) => {
  return <Header {...props}>{children}</Header>;
};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

TableHeader.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(TableHeader, areEqual);
