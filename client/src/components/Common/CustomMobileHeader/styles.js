import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import background from "../../../assets/images/sidebar-background-2.jpg";

export const Background = styled.div`
  z-index: 25;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
    0 6px 10px 4px rgba(60, 64, 67, 0.15);

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
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Links = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  height: 100%;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  font-size: 1em;
  transition: all 0.2s ease;
  border-radius: 3px;
  border: 2px dashed transparent;
  width: 100%;
  position: relative;
  outline: 0;
  white-space: nowrap;
`;

export const Text = styled.span`
  display: none;
  transition: all 0.1s ease;
  color: #bbb;

  :hover {
    color: #eee;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  outline: 0;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5em;
  transition: all 0.1s ease;

  path {
    color: #bbb;
  }

  :hover path {
    color: #eee;
  }
`;

export const Caption = styled.span`
  color: #bbb;

  ${Item}:hover & {
    color: #eee;
  }
`;

export const More = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  font-size: 1em;
  transition: all 0.2s ease;
  border-radius: 3px;
  border: 2px dashed transparent;
  background: none;
  width: 100%;
  position: relative;
  outline: 0;
  white-space: nowrap;
`;

export const MoreItems = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 10px;
  right: 15px;
  width: 55vw;
  height: ${(props) => props.items * 50}px;
  transition: all 0.3s;
  transition-timing-function: ease;
  transform-origin: right bottom;
  transform: scale(${(props) => (props.show ? "1" : "0")});
  opacity: ${(props) => (props.show ? "1" : "0")};

  box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
    0 6px 10px 4px rgba(60, 64, 67, 0.15);

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background-image: url(${background});
    filter: grayscale(1) brightness(0.6);
  }
`;

export const MoreItem = styled(Link)`
  position: relative;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  :last-child {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

export const MoreIcon = styled(FontAwesomeIcon)`
  font-size: 1.5em;
  transition: all 0.1s ease;
  margin: 0 15px;

  path {
    color: #bbb;
  }

  :hover path {
    color: #eee;
  }
`;

export const MoreCaption = styled.span`
  color: #bbb;
  font-size: 1.1em;

  ${MoreItem}:hover & {
    color: #eee;
  }
`;
