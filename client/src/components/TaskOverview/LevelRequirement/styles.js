import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 10px;

  @media (min-width: 700px) {
    padding: 20px 0 20px;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 1.5em;

  & path {
    color: ${(props) => props.color || "#aaa"};
  }

  @media (min-width: 700px) {
    margin-right: 15px;
  }
`;

export const Text = styled.span``;
