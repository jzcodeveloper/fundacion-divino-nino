import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import background from "../../../assets/images/sidebar-background-2.jpg";

export const Background = styled.div`
  z-index: 5;
  position: relative;
  bottom: 0;
  padding: 10px;
  width: 100%;
  height: 70px;
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
  width: 85%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Name = styled.div`
  color: #fff;
  font-weight: normal;
  font-size: 1.5em;
  padding: 0px;
  cursor: context-menu;
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  padding: 10px;
  font-size: 1em;
  transition: all 0.2s ease;
  border-radius: 3px;
  border: 2px dashed transparent;
  width: 100%;
  outline: 0;
  white-space: nowrap;

  :hover {
    border: 2px solid #eee;
  }
`;

export const Text = styled.span`
  transition: all 0.1s ease;
  color: #bbb;

  :hover {
    color: #eee;
  }

  @media (min-width: 1250px) {
    display: none;
  }
`;

export const LongText = styled.span`
  display: none;
  transition: all 0.1s ease;
  color: #bbb;

  :hover {
    color: #eee;
  }

  @media (min-width: 1250px) {
    display: initial;
  }
`;
