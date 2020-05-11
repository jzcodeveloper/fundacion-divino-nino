import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 50;
`;

export const Information = styled.div`
  border-radius: 10px;
  width: 90vw;
  max-width: 700px;
  background: #fbfbfb;
  box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
    0 6px 10px 4px rgba(60, 64, 67, 0.15);
  transition: transform 0.3s, opacity 0.3s;

  &.scale-enter,
  &.scale-exit-active {
    opacity: 0;
    transform: scale(0.5);
  }
`;

export const Header = styled.div`
  border-radius: 10px 10px 0 0;
  padding: 15px;
  background-color: ${(props) => props.color};

  @media (min-width: 700px) {
    padding: 20px;
  }
`;

export const Title = styled.h2`
  color: #ffffff;
`;

export const Subtitle = styled.h3`
  color: #ffffff;
`;

export const Body = styled.div`
  border-radius: 0 0 10px 10px;
  padding: 15px;
  background-color: #fbfbfb;

  @media (min-width: 700px) {
    padding: 20px;
  }
`;

export const Footer = styled.div`
  padding: 0 15px 20px 15px;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 700px) {
    padding: 0 20px 30px 20px;
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  margin: 0 10px;
  outline: 0;
  color: #bbb;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: filter 0.3s;

  :hover {
    filter: brightness(0.95);
  }

  :last-child {
    margin-right: 0;
  }
`;
