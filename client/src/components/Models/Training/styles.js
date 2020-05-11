import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  height: 100%;

  @media (min-width: 700px) {
    width: 85%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 63px);
  background-color: #fbfbfb;
  border-radius: 3px;
  border: 1px solid #ddd;
  padding: 20px 10px;
  margin: 0 auto;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);
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

export const Grids = styled.div`
  width: 100%;

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 25px;
  }
`;

export const Grid = styled.div`
  margin: 20px 0;
`;

export const NoScrollContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  background-color: #0f182b;
  border-radius: 3px;
  box-shadow: 0px 1px 3px 0 rgba(255, 255, 255, 0.55);
  height: 300px;
  padding-bottom: 20px;
  margin-bottom: 70px;

  @media (min-width: 700px) {
    margin-bottom: 20px;
  }
`;

export const NoScroll = styled.div`
  margin-right: -17px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
`;

export const Log = styled.div`
  display: flex;
  padding: 10px 20px;
`;

export const Text = styled.span`
  color: ${(props) => props.color};
  margin: 5px ${(props) => (props.noMargin ? "0" : "10px")} 0 0;
`;
