import React from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { Item, Button, Icon, Caption } from "./styles";

const ListMenuItem = ({ icon, caption, onClick }) => {
  return (
    <Item onClick={onClick}>
      <Button>
        <Icon icon={icon} fixedWidth />
        <Caption>{caption}</Caption>
      </Button>
    </Item>
  );
};

ListMenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ListMenuItem.defaultProps = {
  icon: "",
  caption: "",
};

// The onclick prop is an event handler function
// Since the onclick function is created every time the parent re-renders
// The onclick function (the object) is always going to be different
// Which means memoization won't work because in fact the onclick function object is different
// To solve this, we have to memoize the onclick event handler on the parent
// For instance, by using the useCallback hook
const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(ListMenuItem, areEqual);
