import styled from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.overlayColor};
`;

export const Container = styled.div`
  padding: 30px;
  border-radius: 50%;
  border-left: 5px solid #ddd;
  border-top: 5px solid #ddd;
  border-bottom: 5px solid #ddd;
  border-right: 5px solid ${(props) => props.spinnerColor};
  background-color: transparent;
  animation: spin 0.75s ease infinite;

  @keyframes spin {
    0% {
      transform: rotateZ(-90deg);
    }
    100% {
      transform: rotateZ(270deg);
    }
  }

  @media (min-width: 700px) {
    padding: 35px;
    border-width: 8px;
  }
`;
