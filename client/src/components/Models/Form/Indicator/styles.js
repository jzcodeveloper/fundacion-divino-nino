import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Indicator = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  cursor: pointer;
  z-index: 10;

  :not(:nth-child(${(props) => props.currentTab + 1})) {
    display: none;
  }

  @media (min-width: 700px) {
    :not(:nth-child(${(props) => props.currentTab + 1})) {
      display: block;
    }
  }
`;

export const Label = styled.span`
  display: block;
  font-size: 1em;
  font-weight: bold;
  color: #fbfbfb;
  margin-top: 10px;

  @media (min-width: 700px) {
    font-size: 0.8em;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  & path {
    color: #343434;
  }
`;

export const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 0.75em;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border: 1px solid ${(props) => (props.active ? "#343434" : "#fbfbfb")};
  background-color: ${(props) => (props.active ? "#fbfbfb" : "#343434")};
  box-shadow: 0 0 0 3px ${(props) => (props.active ? "#fbfbfb" : "transparent")}
  color: ${(props) => (props.active ? "#343434" : "#fbfbfb")};
`;
