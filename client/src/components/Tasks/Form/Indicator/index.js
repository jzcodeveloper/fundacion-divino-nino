import React from "react";
import PropTypes from "prop-types";

import { Indicator, Label, Icon, Circle } from "./styles";

const FormIndicator = ({ currentTab, tabIndex, children }) => {
  return (
    <Indicator currentTab={currentTab}>
      <Circle active={currentTab > tabIndex - 1}>
        {currentTab === tabIndex || currentTab < tabIndex ? (
          tabIndex + 1
        ) : (
          <Icon icon="check" />
        )}
      </Circle>
      <Label>{children}</Label>
    </Indicator>
  );
};

FormIndicator.propTypes = {
  currentTab: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

FormIndicator.defaultProps = {
  currentTab: 0,
  tabIndex: 0,
};

const areEqual = (prevProps, nextProps) => {
  if (Math.abs(prevProps.currentTab - nextProps.currentTab) === 1) {
    return !(
      nextProps.currentTab === nextProps.tabIndex ||
      prevProps.currentTab === prevProps.tabIndex
    );
  }
  return false;
};

export default React.memo(FormIndicator, areEqual);
