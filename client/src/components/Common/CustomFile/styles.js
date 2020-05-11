import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: fit-content;
  position: relative;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 2.5em;

  & path {
    color: ${(props) => props.color};
  }
`;

export const Message = styled.p`
  margin: 10px 0;
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;
