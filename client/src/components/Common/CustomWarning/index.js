import React, { useState, useCallback } from "react";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import { Container, Information, Header, Title, Subtitle } from "./styles";
import { Body, Footer, Button } from "./styles";

const CustomWarning = ({
  show,
  hide,
  title,
  subtitle,
  color,
  buttons,
  children,
}) => {
  const [animate, setAnimate] = useState(false);

  const onEntered = useCallback(() => setAnimate(true), []);

  const hideWarning = useCallback((onClick) => {
    setAnimate(false);
    setTimeout(() => {
      if (onClick) onClick();
      hide();
    }, 300);
  }, []);

  return (
    <CSSTransition
      in={show}
      timeout={{ enter: 0, exit: 300 }}
      onEntered={onEntered}
      unmountOnExit
    >
      <Container>
        <CSSTransition
          in={animate}
          classNames="scale"
          timeout={{ enter: 0, exit: 300 }}
          unmountOnExit
        >
          <Information>
            <Header color={color}>
              <Title>{title}</Title>
              <Subtitle>{subtitle}</Subtitle>
            </Header>
            <Body>{children}</Body>
            <Footer>
              {buttons.map(
                ({ backgroundColor, color, caption, onClick }, index) => (
                  <Button
                    key={index}
                    style={{ backgroundColor, color }}
                    onClick={hideWarning.bind(null, onClick)}
                  >
                    {caption}
                  </Button>
                )
              )}
            </Footer>
          </Information>
        </CSSTransition>
      </Container>
    </CSSTransition>
  );
};

CustomWarning.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  color: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      backgroundColor: PropTypes.string,
      color: PropTypes.string,
      caption: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  children: PropTypes.node,
};

CustomWarning.defaultProps = {
  show: false,
  title: "",
  subtitle: "",
  color: "#fbfbfb",
  buttons: [{ caption: "" }],
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.show, nextProps.show) &&
  isEqual(prevProps.title, nextProps.title);

export default React.memo(CustomWarning, areEqual);
