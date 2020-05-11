import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #141415;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

export const Container = styled.div`
  text-align: center;
  width: 100%;
`;

export const Image = styled.img`
  width: 300px;
  @media (min-width: 450px) {
    width: 500px;
  }
`;

export const Paragraph = styled.p`
  color: white;
  font-size: 2em;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  text-align: center;

  @media (min-width: 450px) {
    font-size: 2.5em;
  }
`;
