import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { toggleSidebarItemRequest } from "../../../store/app/actions";
import { selectSidebarItemExpanded } from "../../../store/app/selectors";

import { Container, Menu, MenuTitle, MenuDescription } from "./styles";
import { CollapseIcon, MenuItems, MenuItem, Icon, Caption } from "./styles";

const SidebarItem = ({ title, captions, icons, links, collapsed, index }) => {
  const dispatch = useDispatch();
  const expanded = useSelector(selectSidebarItemExpanded(index));

  const toggleSidebarItem = useCallback(() => {
    dispatch(toggleSidebarItemRequest(index));
  }, [index]);

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

SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  icons: PropTypes.arrayOf(PropTypes.string),
  captions: PropTypes.arrayOf(PropTypes.string).isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  collapsed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

SidebarItem.defaultProps = {
  title: "",
  icons: [],
  captions: [],
  links: [],
  collapsed: false,
  index: 0,
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.collapsed, nextProps.collapsed);

export default React.memo(SidebarItem, areEqual);
