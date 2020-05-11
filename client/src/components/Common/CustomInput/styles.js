import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  position: relative;
`;

export const Tooltip = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 100%;
  font-size: 0.95em;
  border-radius: 10px;
  background-color: #343434;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
    0 6px 10px 4px rgba(60, 64, 67, 0.15);
  transition: all 0.2s;
  z-index: 25;

  &.fade-enter {
    visibility: hidden;
    opacity: 0;
    left: 5%;
  }

  &.fade-enter-done {
    visibility: visible;
    opacity: 1;
    left: 0%;
  }

  &.fade-exit {
    visibility: hidden;
    opacity: 0;
    left: 0%;
  }
`;

export const Triangle = styled.div`
  display: block;
  position: absolute;
  top: -10px;
  left: 15px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #343434;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5em;

  & path {
    color: ${(props) => props.color};
  }
`;

export const ShowIcon = styled(Icon)`
  position: absolute;
  top: calc(50% - 12px);
  right: 10px;
  transition: opacity 0.3s;
  opacity: 0.8;

  :hover {
    opacity: 0.5;
  }
`;

export const Input = `
  background-color: transparent;
  font-size: 0.95em;
  font-weight: bold;
  outline: 0;
  width: 100%;
  border: 2px solid #999999;
  border-radius: 6px;
  padding: 8px;
  margin: 5px 0;
  transition: border-color 0.3s;

  :focus {
    border-color: #555555;
  }
`;

export const Password = styled.div`
  width: 100%;
  position: relative;

  input {
    padding-right: 40px;
  }
`;

export const TextInput = styled.input`
  ${Input}
`;

export const TextArea = styled.textarea`
  ${Input}
`;

export const Messages = styled.div`
  display: flex;
  flex-flow: column;
`;

export const Text = styled.span`
  color: #ccc;
  margin-left: 10px;
`;
