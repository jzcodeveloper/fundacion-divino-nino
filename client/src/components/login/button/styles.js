import styled from "styled-components";

export const Button = styled.button`
  border-radius: 3px;
  font-size: 0.9em;
  padding: 8px 12px;
  margin-top: 15px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  cursor: pointer;
  transition: box-shadow 0.25s;
  outline: 0;

  :hover {
    box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.15);
  }

  :focus {
    box-shadow: 0 0px 0px 4px rgba(0, 0, 0, 0.075), 0 0 6px #d1d8dd;
  }
`;
