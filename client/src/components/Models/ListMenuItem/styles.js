import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 30px 10px 10px;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 700px) {
    padding: 12px 36px 12px 12px;
  }
`;

export const Button = styled.button`
  text-align: center;
  background-color: transparent;
  cursor: pointer;
  outline: 0;
  white-space: nowrap;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 1.1em;
  margin-right: 10px;
  @media (min-width: 700px) {
    font-size: 1.2em;
  }
`;

export const Caption = styled.span`
  font-size: 0.9em;
  @media (min-width: 700px) {
    font-size: 1em;
  }
`;
