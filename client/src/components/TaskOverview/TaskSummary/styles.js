import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Flex = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;

  @media (min-width: 700px) {
    flex-flow: row;
  }
`;

export const Element = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  background-color: #fbfbfb;
  border-radius: 3px;
  border: 1px solid #ddd;
  padding: 20px 15px;
  margin: 5px 0;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);

  @media (min-width: 700px) {
    margin: 0 5px;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }
`;

export const Heading = styled.h3`
  flex: 1;
  font-weight: normal;
`;

export const Data = styled.span`
  flex: 1;
  font-size: 3em;
  color: #ccc;
`;
