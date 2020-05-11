import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  padding: 0 0 50px 0;
  margin: 0 auto;
  height: fit-content;

  @media (min-width: 700px) {
    width: 100%;
    padding: 10px 45px 25px 45px;
  }
`;

export const Heading = styled.h1`
  position: relative;
  margin: 10px 0 10px 0;
  font-size: 2em;

  ::after {
    content: "";
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 100%;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 700px) {
    margin: 20px 0 10px 0;
    font-size: 2em;

    ::after {
      bottom: -50px;
    }
  }
`;

export const Small = styled.p`
  margin-left: 2px;
  margin-bottom: 30px;

  @media (min-width: 700px) {
    margin-bottom: 50px;
  }
`;
