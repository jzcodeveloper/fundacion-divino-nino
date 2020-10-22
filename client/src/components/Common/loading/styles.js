import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
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
  height: 100px;
  @media (min-width: 450px) {
    height: 150px;
  }
`;
