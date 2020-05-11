import React from "react";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import { Container, Icons, Icon } from "./styles";

const View = ({ show, hide, children }) => {
  return (
    <CSSTransition
      in={show}
      timeout={{ enter: 0, exit: 400 }}
      classNames="move"
      unmountOnExit
    >
      <Container>
        <Icons onClick={hide}>
          <Icon icon="chevron-right" color="#fbfbfb" />
        </Icons>
        <Container>{children}</Container>
      </Container>
    </CSSTransition>
  );
};

View.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  children: PropTypes.node,
};

View.defaultProps = {
  show: false,
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.show, nextProps.show);

export default React.memo(View, areEqual);
