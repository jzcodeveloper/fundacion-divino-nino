import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;

  @media (min-width: 700px) {
    width: 50%;
  }
`;

export const NoScrollContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

export const NoScroll = styled.div`
  margin-right: -17px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);

  @media (min-width: 700px) {
    width: 100%;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  font-size: 1.2em;
  cursor: pointer;

  & path {
    color: ${(props) => props.color};
  }
`;

export const AddInput = styled(FontAwesomeIcon)`
  margin-top: 5px;
  font-size: 1.6em;
  cursor: pointer;

  & path {
    color: ${(props) => props.color};
  }
`;

export const Text = styled.span`
  margin-left: 8px;
  margin-top: 5px;
  cursor: pointer;
`;
