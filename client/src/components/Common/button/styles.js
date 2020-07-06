import styled from "styled-components";

export const Button = styled.button`
  border-radius: 3px;
  font-size: 0.75em;
  padding: 8px 12px;
  margin: 0 3px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  cursor: pointer;
  transition: box-shadow 0.25s;

  :hover {
    box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.15);
  }
`;
