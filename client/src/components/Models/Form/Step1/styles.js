import styled from "styled-components";

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;

  @media (min-width: 700px) {
    width: 50%;
  }
`;
