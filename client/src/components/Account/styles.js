import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 10px 20px 70px 20px;
  margin: 0 auto;
  height: fit-content;

  @media (min-width: 700px) {
    padding: 10px 45px 80px 45px;
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-flow: column;

  @media (min-width: 700px) {
    flex-flow: row;
  }
`;

export const Forms = styled.div`
  width: 100%;
  margin: 0 0 25px 0;

  :last-child {
    margin-bottom: 0;
  }

  @media (min-width: 700px) {
    margin: 0 15px;

    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`;
