import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Heading = styled.h2`
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
  margin-bottom: 20px;
`;

export const NoScroll = styled.div`
  margin-right: -17px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
`;

export const Log = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px 20px;

  @media (min-width: 700px) {
    flex-flow: row;
  }
`;

export const Text = styled.span`
  color: ${(props) => props.color};
  margin: 5px 15px 0 0;
`;
