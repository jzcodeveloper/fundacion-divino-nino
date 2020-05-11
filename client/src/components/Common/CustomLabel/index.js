import React, { useState, useLayoutEffect, useRef } from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { Container, Label, Icon, Tooltip, Triangle } from "./styles";

const FormLabel = ({ tooltip, children }) => {
  const [inverted, setInverted] = useState(false);
  const [width, setWidth] = useState(0);
  const parentRef = useRef();
  const tooltipRef = useRef();

  useLayoutEffect(() => {
    const parent = parentRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();

    if (tooltip.x - tooltip.width - 40 > (parent.x + parent.width) / 2)
      setInverted(true);
  }, []);

  useLayoutEffect(() => {
    const { x } = tooltipRef.current.getBoundingClientRect();
    const { innerWidth } = window;

    if (inverted) setWidth(x + 10);
    else setWidth(innerWidth - x - 10);
  }, [inverted]);

  const checkPosition = () => {};

  return (
    <Container ref={parentRef}>
      <Label onMouseOver={checkPosition}>
        {children}
        <Icon icon="question-circle" color="#555555" />
        <Tooltip ref={tooltipRef} inverted={inverted} width={width}>
          <Triangle inverted={inverted} />
          {tooltip}
        </Tooltip>
      </Label>
    </Container>
  );
};

FormLabel.propTypes = {
  tooltip: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FormLabel.defaultProps = {
  tooltip: "",
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.tooltip, nextProps.tooltip);

export default React.memo(FormLabel, areEqual);
