import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: fit-content;
  background-color: transparent;
`;

export const Body = styled.div`
  width: 100%;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fbfbfb;
  position: relative;

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Inputs = styled.div`
  flex: 1;
  margin: 10px;
`;

export const Footer = styled.div`
  padding: 0 20px 20px 20px;
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  padding: 8px;
  margin: 5px 0;
  outline: 0;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 6px;
  border: 1px solid ${(props) => props.backgroundColor};
  cursor: pointer;
  font-size: 1em;
  transition: filter 0.3s;
  width: 100%;
  cursor: ${(props) => (props.grayed ? "not-allowed" : "pointer")};

  :hover {
    filter: brightness(0.95);
  }

  :disabled {
    cursor: not-allowed;
  }
`;
