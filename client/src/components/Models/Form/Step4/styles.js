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
  width: calc(100% - 17px);

  @media (min-width: 700px) {
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

export const MobileLabel = styled.div`
  display: block;
  margin-bottom: 5px;
  @media (min-width: 700px) {
    display: none;
  }
`;
