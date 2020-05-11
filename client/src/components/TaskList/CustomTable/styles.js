import styled from "styled-components";

export const defaultStructure = `
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr`;

export const Table = styled.div`
  position: relative;
  background-color: #fbfbfb;
  border-radius: 3px;
  border: 1px solid #ddd;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);

  @media (min-width: 700px) {
    padding: 45px 20px;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  padding: 15px;
  min-height: 69px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;

  :first-child {
    display: none;
  }

  :first-child {
    border-top: 1px solid #ddd;
  }

  :last-child {
    border-radius: 3px;
    border-bottom: none;
  }

  :nth-child(odd) {
    background-color: #f4f5f8;
  }

  @media (min-width: 700px) {
    ${(props) => props.structure}
    width: calc(100% - 40px);
    border-bottom: 2px solid #ddd;

    :first-child {
      display: grid;
      border-top: 2px solid #ddd;
      background-color: #f4f5f8;
      border-radius: 3px 3px 0 0;
    }

    :last-child {
      border-bottom: 2px solid #ddd;
    }
  }
`;

export const Message = styled.div`
  text-align: center;
`;
