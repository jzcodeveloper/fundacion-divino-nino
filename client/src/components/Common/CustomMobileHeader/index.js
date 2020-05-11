import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Background, Container, Links, StyledLink, Text, Item } from "./styles";
import { Icon, Caption, More, MoreItems, MoreItem, MoreIcon } from "./styles";
import { MoreCaption } from "./styles";

const CustomHeader = ({ items }) => {
  const [show, setShow] = useState(false);

  const mainItems = useMemo(() => items.slice(0, 4), [items]);
  const otherItems = useMemo(() => items.slice(4), [items]);

  const showMenu = useCallback(() => setShow(true), []);

  const hideMenu = useCallback(() => setTimeout(() => setShow(false), 50), []);

  return (
    <Background>
      <Container>
        <Links>
          {mainItems.map(({ link, shortCaption, icon }) => (
            <StyledLink key={link} to={link}>
              <Item>
                <Icon icon={icon} fixedWidth />
                <Caption>{shortCaption}</Caption>
              </Item>
            </StyledLink>
          ))}

          {items.length > 4 ? (
            <More onClick={showMenu} onBlur={hideMenu}>
              <Item>
                <Icon icon="plus" fixedWidth />
                <Caption>Más</Caption>
              </Item>
            </More>
          ) : null}
        </Links>

        <MoreItems items={otherItems.length} show={show}>
          {otherItems.map(({ link, shortCaption, icon }) => (
            <MoreItem key={link} to={link}>
              <MoreIcon icon={icon} fixedWidth />
              <MoreCaption>{shortCaption}</MoreCaption>
            </MoreItem>
          ))}
        </MoreItems>
      </Container>
    </Background>
  );
};

CustomHeader.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      shortCaption: PropTypes.string,
      longCaption: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
};

CustomHeader.defaultProps = {
  items: [],
};

export default CustomHeader;
