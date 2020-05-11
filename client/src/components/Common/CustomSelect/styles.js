import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  position: relative;
`;

export const Select = styled.select`
  background-color: transparent;
  font-size: 0.95em;
  font-weight: bold;
  outline: 0;
  width: 100%;
  border: 2px solid #999999;
  border-radius: 6px;
  padding: 8px;
  margin: 5px 0;
  transition: border-color 0.3s;

  :focus {
    border-color: #555555;
  }
`;

export const Option = styled.option``;
