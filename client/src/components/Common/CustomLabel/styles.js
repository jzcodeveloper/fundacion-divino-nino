import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  position: relative;
  align-items: center;
  width: fit-content;
  font-size: 1em;
  margin-bottom: 5px;
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  font-size: 1.2em;

  & path {
    color: ${(props) => props.color};
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  top: calc(50% - 25px);
  left: ${(props) => (props.inverted ? "initial" : "calc(100% + 20px)")};
  right: ${(props) => (props.inverted ? "40px" : "initial")};
  color: #ccc;
  font-size: 0.95em;
  width: ${(props) => props.width}px;
  min-height: 50px;
  max-width: 400px;
  word-wrap: break-word;
  border-radius: 10px;
  background-color: #343434;
  padding: 10px 15px;
  box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
    0 6px 10px 4px rgba(60, 64, 67, 0.15);
  transition: all 0.2s;
  visibility: hidden;
  opacity: 0;
  z-index: 15;

  ${Label}:hover & {
    visibility: visible;
    opacity: 1;
  }

  @media (min-width: 500px) {
    width: 300px;
  }

  @media (min-width: 900px) {
    word-wrap: none;
    width: 400px;
    padding: 15px 25px;
  }
`;

export const Triangle = styled.div`
  display: block;
  position: absolute;
  top: 15px;
  left: ${(props) => (props.inverted ? "initial" : "-10px")};
  right:${(props) => (props.inverted ? "-10px" : "initial")}
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #343434;
  transform: rotate(${(props) => (props.inverted ? "180deg" : "0deg")});
`;
