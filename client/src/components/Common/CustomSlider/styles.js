import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  position: relative;
`;

export const Slider = styled.input`
  width: 100%;
  height: 3px;
  margin: 20px 0;
  outline: 0;
  appearance: none;
  background: #d3d3d3;
  opacity: 0.7;
  transition: opacity 0.2s;

  :hover {
    opacity: 0.8;
  }

  :hover::-webkit-slider-thumb {
    border-radius: 3px;
  }

  ::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #343434;
    cursor: pointer;
    border: 2.5px solid #fbfbfb;
    box-shadow: 0 0 0 5px #343434;
    border-radius: 50%;
    transition: border-radius 0.2s;
  }
`;

export const Messages = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.span`
  text-align: left;
`;

export const Right = styled.span`
  text-align: right;
`;
