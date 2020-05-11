import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  box-shadow: 0 -1px 0 #999 inset;
  cursor: pointer;
`;

export const Menu = styled.div`
  flex-flow: column;
  position: relative;
  cursor: pointer;
  padding: 20px 24px;

  :hover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
  }

  display: ${(props) => (props.collapsed ? "none" : "flex")};
`;

export const MenuTitle = styled.h4`
  color: #ffffff;
  font-size: 15px;
`;

export const MenuDescription = styled.span`
  margin-top: 3px;
  font-size: 0.72em;
  font-weight: bold;
  color: #bbb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.3s;

  position: ${(props) => (props.expanded ? "absolute" : "static")};
  width: ${(props) => (props.expanded ? "calc(100% - 48px)" : "100%")};
  bottom: 2px;

  &.fade-enter,
  &.fade-exit-active {
    opacity: 0;
  }
`;

export const CollapseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 0.8em;
  transition: transform 0.15s, opacity 0.15s;

  & path {
    color: transparent;
    transition: color 0.15s;
  }

  ${Menu}:hover & path {
    color: #aaa;
  }

  &.rotate-enter,
  &.rotate-exit-active {
    transform: translateX(7px) rotateZ(180deg);
    opacity: 0;
  }
`;

export const MenuItems = styled.div`
  transition: all 0.2s;
  overflow: hidden;
  padding-top: ${(props) => (props.collapsed ? "20px" : "0px")};
  padding-bottom: 20px;

  &.expand-enter,
  &.expand-exit-active {
    opacity: 0;
    max-height: 0;
  }

  &.expand-enter-active {
    max-height: 100vh;
  }

  &.expand-exit {
    padding-bottom: 0;
  }
`;

export const MenuItem = styled(Link)`
  display: flex;
  font-size: 0.8em;
  font-weight: bold;
  padding: 7px 22px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;

  :hover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5em;
  padding-right: 5px;

  & path {
    color: #aaa;
  }
`;

export const Caption = styled.span`
  margin-left: 15px;
  color: #bbb;
  transition: opacity 0.3s;

  position: ${(props) => (props.collapsed ? "absolute" : "static")};
  width: ${(props) => (props.collapsed ? "calc(100% - 48px)" : "100%")};
  opacity: ${(props) => (props.collapsed ? "0" : "1")};
`;
