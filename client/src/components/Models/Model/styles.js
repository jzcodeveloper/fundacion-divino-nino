import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  height: 100%;

  @media (min-width: 700px) {
    width: 85%;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 3px;
  padding: 15px 15px 25px 15px;
  margin: 20px 0;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);

  @media (min-width: 700px) {
    padding: 20px 20px 30px 20px;
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

export const Heading2 = styled.h2`
  position: relative;
  color: ${(props) => props.color || "#8e9fb1"};
  margin: 0 0 30px 0;

  ::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.15);
  }
`;

export const Paragraph = styled.p`
  margin: 10px 0;

  :last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: 700px) {
    margin: 10px 0 20px 0;

    :last-of-type {
      margin-bottom: 20px;
    }
  }
`;

export const Charts = styled.div`
  display: block;
  padding-bottom: 50px;

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0 25px;
    padding-bottom: 0;
  }
`;

export const Chart = styled.div`
  margin: 20px 0;
`;

export const Loading = styled.div`
  min-height: calc(100vh - 60px);
  position: relative;
  background-color: transparent;
`;
