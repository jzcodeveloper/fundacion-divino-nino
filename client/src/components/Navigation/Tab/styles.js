import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  padding: 0 0 10px 0;
  margin: 0 auto;
  height: fit-content;

  @media (min-width: 700px) {
    width: 100%;
    padding: 10px 45px 25px 45px;
  }
`;

export const Heading = styled.h1`
  margin: 10px 0 10px 0;

  @media (min-width: 700px) {
    font-size: 2em;
    margin: 20px 0;
  }
`;

export const Items = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;

  ::after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 0;
    width: 100%;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.15);
  }
`;
