import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import background from "../../../assets/images/background.jpg";

export const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  transition: transform 0.4s ease, opacity 0.2s ease;

  background-image: url(${background});
  background-size: 35px;
  background-color: #eceff1;

  &.move-enter {
    transform: translateX(100%);
    opacity: 0;
  }

  &.move-enter-done {
    transform: translateX(0);
    opacity: 1;
  }

  &.move-exit-active {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const Icons = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: calc(50% - 25px);
  left: -30px;
  width: 55px;
  height: 50px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #555555, #2d2d2d);
  box-shadow: 0 0 0 4px rgba(251, 251, 251, 1);
  z-index: 20;
  cursor: pointer;
  transform: translateX(-10%);
  transition: transform 0.3s;

  :hover {
    transform: translateX(0%);
  }

  @media (min-width: 700px) {
    top: calc(50% - 16px);
    left: -35px;
    width: 70px;
    height: 70px;
    box-shadow: 0 0 0 6px rgba(251, 251, 251, 1);
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 2em;
  margin-right: 5px;

  & path {
    color: ${(props) => props.color};
  }

  @media (min-width: 700px) {
    margin-right: 10px;
  }
`;
