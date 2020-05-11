import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;

  :not(:last-child) {
    margin-right: 10px;
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

export const Labels = styled.div`
  display: none;

  @media (min-width: 700px) {
    display: flex;

    div:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export const Flex = styled.div`
  @media (min-width: 700px) {
    display: flex;
  }
`;

export const Row = styled.div`
  :not(:last-child) {
    width: calc(100% - 17px);
  }

  @media (min-width: 700px) {
    width: 100%;
    display: flex;
    flex: 1;
    align-items: center;

    :not(:last-child) {
      margin-right: 10px;
    }

    :last-child {
      margin-right: 0;
    }
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin: 0 10px;
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

export const MobileLabel = styled.div`
  display: block;
  margin-bottom: 5px;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const InputWithIcon = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 17px);

  @media (min-width: 700px) {
    width: 100%;
  }
`;
