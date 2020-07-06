import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 1px solid #d1d8dd;
  background-color: #fbfbfb;
  padding: 18px 0;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  @media (min-width: 750px) {
    width: 80%;
  }
`;

export const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
