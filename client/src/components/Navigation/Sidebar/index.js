import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { toggleSidebarRequest } from "../../../store/app/actions";
import { selectSidebarCollapsed } from "../../../store/app/selectors";

import AppLogo from "../../../assets/icons/app-icon-500x500.png";
import SidebarItem from "../SidebarItem";

import { Container, Heading, Top, Logo, Title, SidebarItems } from "./styles";
import { Toggle, Icons, Icon } from "./styles";

const Sidebar = ({ items }) => {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectSidebarCollapsed);
  const history = useHistory();

  const toggleSidebar = () => {
    dispatch(toggleSidebarRequest());
  };

  const pushHistory = useCallback((e) => {
    history.push(e.currentTarget.dataset.link);
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
        <Icons collapsed={collapsed}>
          <Icon icon="chevron-left" />
        </Icons>
      </Toggle>
    </Container>
  );
};

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icons: PropTypes.arrayOf(PropTypes.string),
      captions: PropTypes.arrayOf(PropTypes.string).isRequired,
      links: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

Sidebar.defaultProps = {
  items: [],
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.items, nextProps.items);

export default React.memo(Sidebar, areEqual);
