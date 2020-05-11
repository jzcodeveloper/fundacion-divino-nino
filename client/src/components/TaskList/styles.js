import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 10px 20px 70px 20px;
  margin: 0 auto;
  height: fit-content;

  @media (min-width: 700px) {
    width: 85%;
    padding: 10px 0 70px 0;
  }
`;

export const Heading = styled.h1`
  position: relative;
  margin: 10px 0 30px 0;

  ::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 700px) {
    margin: 20px 0 30px 0;
  }
`;

export const Text = styled.p`
  margin: 20px 0;
`;

export const Loading = styled.div`
  min-height: calc(100vh - 327px);
  position: relative;
`;
