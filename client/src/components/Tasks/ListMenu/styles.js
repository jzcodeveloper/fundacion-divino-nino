import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  padding: 15px;
  top: calc(50% - 15px);
  right: 10px;
  border-radius: 50%;

  @media (min-width: 700px) {
    width: 30px;
    height: 30px;
    padding: 30px;
    top: calc(50% - 30px);
    right: 20px;
  }
`;

export const Button = styled.button`
  position: relative;
  outline: 0;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 20px;
  top: -20px;
  right: 20px;
  transition: background-color 0.3s;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 700px) {
    width: 30px;
    height: 30px;
    padding: 30px;
    top: -30px;
    right: 30px;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  top: calc(50% - 8.5px);
  left: calc(50% - 3.5px);
  font-size: 1.3em;

  & path {
    color: #888;
  }
`;

export const Menu = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 3px;
  background-color: #fbfbfb;
  border: 1px solid #ddd;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);
  z-index: 10;
  transition: all 0.3s;
  transition-timing-function: ease;

  transform-origin: right top;
  transform: scale(${(props) => (props.show ? "1" : "0")});
  opacity: ${(props) => (props.show ? "1" : "0")};
`;
