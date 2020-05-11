import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 10px 20px 25px 20px;
  margin: 0 auto;
  height: fit-content;

  @media (min-width: 700px) {
    padding: 10px 45px 80px 45px;
  }
`;

export const Heading = styled.h2`
  position: relative;
  margin: 0 0 10px 0;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const Margin = styled.br``;
