import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Container = styled.div`
  background-color: #b90035;
  /* background-color: #d0142c; */
  min-height: calc(100vh - 40px);
`;

export const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px 0;
  width: 100%;
  padding: 80px 0 0 0;
  margin: 0 auto;

  @media (min-width: 450px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 600px) {
    width: 80%;
  }

  @media (min-width: 750px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 900px) {
    width: 75%;
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const Item = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

export const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  height: 52px;
  width: 52px;
  border-radius: 16px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  @media (min-width: 750px) {
    height: 72px;
    width: 72px;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 2em;
  pointer-events: none;

  path {
    color: #fbfbfb;
  }
`;

export const Caption = styled.span`
  color: #fbfbfb;
  margin-top: 8px;
  font-size: 0.85em;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5), 0px 1px 5px rgba(0, 0, 0, 0.5);
`;
