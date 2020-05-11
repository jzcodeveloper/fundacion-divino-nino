import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import AppLogo from "../../../assets/icons/app-icon-500x500.png";
import SidebarItem from "./SidebarItem";

import { Container, Heading, Top, Logo, Title, SidebarItems } from "./styles";
import { Toggle, IconContainer, Icon } from "./styles";

const Sidebar = ({ items }) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const toggleSidebar = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const pushHistory = useCallback((e) => {
    history.push(e.target.dataset.link);
  }, []);

  return (
    <Container collapsed={collapsed}>
      <Top onClick={pushHistory} data-link="/dashboard">
        <Logo src={AppLogo} collapsed={collapsed} />
        <CSSTransition
          in={!collapsed}
          timeout={0}
          classNames="fade"
          unmountOnExit
        >
          <Title collapsed={collapsed}>Universidad Alonso de Ojeda</Title>
        </CSSTransition>
      </Top>

      <SidebarItems collapsed={collapsed}>
        {items.map(({ title, icons, captions, links }, index) => (
          <SidebarItem
            key={title}
            title={title}
            icons={icons}
            captions={captions}
            links={links}
            collapsed={collapsed}
            index={index}
          />
        ))}
      </SidebarItems>

      <Toggle onClick={toggleSidebar} collapsed={collapsed}>
        <IconContainer collapsed={collapsed}>
          <Icon icon="chevron-left" />
        </IconContainer>
      </Toggle>
    </Container>
  );
};

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.items, nextProps.items);

export default React.memo(Sidebar, areEqual);
