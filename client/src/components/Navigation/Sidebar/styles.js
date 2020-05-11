import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import background from "../../../assets/images/sidebar-background-2.jpg";

export const Container = styled.div`
  z-index: 10;
  display: none;
  position: relative;
  flex-flow: column;
  left: 0;
  bottom: 0;
  top: 0;
  overflow: hidden;
  transition: min-width 0.7s, max-width 0.7s;
  transition-timing-function: cubic-bezier(1, 0, 0, 1);
  box-shadow: 0 2px 13px 0 rgba(60, 64, 67, 0.3),
    0 6px 10px 14px rgba(60, 64, 67, 0.15);
  min-width: ${(props) => (props.collapsed ? "68px" : "256px")};
  max-width: ${(props) => (props.collapsed ? "68px" : "256px")};

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${background});
    filter: grayscale(1) brightness(0.6);
  }

  @media (min-width: 700px) {
    display: flex;
  }
`;

export const Heading = styled.h2`
  color: #fff;
  font-weight: normal;
  text-align: center;
`;

export const Top = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 0 -1px 0 #999 inset;
  padding: 20px 15px;
  cursor: pointer;
`;

export const Logo = styled.img`
  margin-right: 5px;
  width: 50px;
  height: 50px;
  transition: transform 0.5s;

  transform: scale(${(props) => (props.collapsed ? "0.7" : "1")});
`;

export const Title = styled.a`
  position: relative;
  display: block;
  color: #fff;
  font-size: 1.5em;
  font-weight: normal;
  margin-top: 10px;
  text-align: center;
  transition: opacity 0s;
  outline: 0;

  &.fade-enter,
  &.fade-exit-active {
    opacity: 0;
  }
`;

export const SidebarItems = styled.div`
  flex: ${(props) => (props.collapsed ? "none" : "1")};
  overflow-x: hidden;
  overflow-y: scroll;
  margin-right: -18px;
  max-height: ${(props) => (props.collapsed ? "61%" : "unset")};
`;

export const Toggle = styled.button`
  position: relative;
  padding: 20px 24px;
  height: 58px;
  outline: 0;
  background-color: transparent;
  box-shadow: 0 1px 0 #999 inset;
  cursor: pointer;
  flex: ${(props) => (props.collapsed ? "1" : "initial")};
`;

export const Icons = styled.div`
  position: absolute;
  top: 20px;
  right: 24px;
  width: 24px;
  height: 24px;
  text-align: center;
  transition: transform 0.3s;

  transform: rotateZ(${(props) => (props.collapsed ? "180deg" : "0deg")});
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 1.2em;
  transition: color 0.3s, transform 0.3s;

  & path {
    color: #ddd;
  }

  ${Toggle}:hover & path {
    color: #fff;
  }
`;
