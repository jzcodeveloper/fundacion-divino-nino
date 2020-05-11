import styled from "styled-components";

export const defaultStructure = `
  grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
`;

export const Table = styled.div`
  position: relative;
  background-color: #fbfbfb;
  border-radius: 3px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  padding: 15px;
  min-height: 69px;
  border-bottom: 1px solid #ddd;

  :first-child {
    display: none;
  }

  :first-child h5 {
    color: #fbfbfb;
  }

  :last-child {
    border-radius: 0 0 3px 3px;
  }

  :not(:first-child):nth-child(odd) {
    background-color: #fbfbfb;
  }

  :nth-child(even) {
    background-color: #f4f5f8;
  }

  @media (min-width: 700px) {
    ${(props) => props.structure};

    :first-child {
      display: grid;
      background-color: #3a3a3a;
      border-radius: 3px 3px 0 0;
    }
  }
`;

export const Message = styled.div`
  text-align: center;
`;
