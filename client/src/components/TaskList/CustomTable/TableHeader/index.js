import React from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { Header, Icon } from "./styles";

const TableHeader = ({ id, sort, descending, children, ...props }) => {
  return (
    <Header {...props}>
      <Icon icon="caret-up" id={id} sort={sort} descending={descending} />
      <Icon icon="caret-down" id={id} sort={sort} descending={descending} />
      {children}
    </Header>
  );
};

TableHeader.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  descending: PropTypes.bool.isRequired,
};

TableHeader.defaultProps = {
  descending: true,
};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(TableHeader, areEqual);
