import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import { Container, Menu, MenuTitle, MenuDescription } from "./styles";
import { CollapseIcon, MenuItems, MenuItem, Icon, Caption } from "./styles";

const SidebarItem = ({ title, captions, icons, links, collapsed, index }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebarItem = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Container>
      <Menu onClick={toggleSidebarItem} collapsed={collapsed}>
        <MenuTitle>{title}</MenuTitle>
        <CSSTransition
          in={!expanded}
          classNames="fade"
          timeout={300}
          unmountOnExit
        >
          <MenuDescription expanded={expanded}>
            {captions.join(", ")}
          </MenuDescription>
        </CSSTransition>
        <CSSTransition
          in={expanded}
          classNames="rotate"
          timeout={150}
          unmountOnExit
        >
          <CollapseIcon icon="chevron-up" />
        </CSSTransition>
      </Menu>
      <CSSTransition
        in={expanded}
        classNames="expand"
        timeout={200}
        unmountOnExit
      >
        <MenuItems collapsed={collapsed}>
          {captions.map((caption, index) => (
            <MenuItem key={index} to={links[index]}>
              <Icon icon={icons[index]} fixedWidth />
              <Caption collapsed={collapsed}>{caption}</Caption>
            </MenuItem>
          ))}
        </MenuItems>
      </CSSTransition>
    </Container>
  );
};

SidebarItem.propTypes = {};

SidebarItem.defaultProps = {};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.title, nextProps.title);

export default React.memo(SidebarItem, areEqual);
