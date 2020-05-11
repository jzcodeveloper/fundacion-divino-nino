import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Header = styled.h5`
  position: relative;
  display: block;
  font-size: 0.9em;
  padding-left: 16px;
  text-transform: uppercase;
  cursor: pointer;
  color: #999;
`;

export const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 0;
  font-size: 1.2em;
  pointer-events: none

  :nth-child(1) {
    top: calc(50% - 13px);
  }

  :nth-child(1) path {
    color: ${({ descending, sort, id }) =>
      descending && sort === id ? "#666" : "#bbb"};
  }

  :nth-child(2) {
    top: calc(50% - 2px);
  }

  :nth-child(2) path {
    color: ${({ descending, sort, id }) =>
      !descending && sort === id ? "#666" : "#bbb"};
  }
`;
