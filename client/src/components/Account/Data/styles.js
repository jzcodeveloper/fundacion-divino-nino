import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: fit-content;
  background-color: transparent;
`;

export const Flex = styled.div`
  display: flex;
  flex-flow: column;

  @media (min-width: 700px) {
    flex-flow: row;
  }
`;

export const Information = styled.div`
  border-radius: 5px;
  width: 100%;
  background-color: #fbfbfb;
  box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
    0 6px 10px 4px rgba(60, 64, 67, 0.15);
  transition: transform 0.3s, opacity 0.3s;
`;

export const Header = styled.div`
  border-radius: 5px 5px 0 0;
  padding: 15px;
  background-color: ${(props) => props.color};

  @media (min-width: 700px) {
    padding: 20px;
  }
`;

export const Title = styled.p`
  text-align: center;
  color: #ffffff;
  font-size: 1.2em;
`;

export const Body = styled.div`
  border-radius: 0 0 5px 5px;
  padding: 15px;
  background-color: #fbfbfb;
  position: relative;

  @media (min-width: 700px) {
    padding: 20px;
  }
`;

export const Footer = styled.div`
  padding: 0 15px 15px 15px;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 700px) {
    padding: 0 20px 20px 20px;
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  outline: 0;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: filter 0.3s;
  cursor: ${(props) => (props.grayed ? "not-allowed" : "pointer")};

  :hover {
    filter: brightness(0.95);
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export const Labels = styled.div`
  width: 100%;
  margin: 5px 0 0 0;

  @media (min-width: 700px) {
    margin: 10px 0;
    width: 35%;
  }
`;

export const Inputs = styled.div`
  width: 100%;

  @media (min-width: 700px) {
    width: 65%;
  }
`;
