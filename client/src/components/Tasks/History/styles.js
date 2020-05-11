import styled from "styled-components";

export const tableStructure = `
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr 1fr;
`;

export const Container = styled.div`
  width: 100%;
  padding: 10px 20px 25px 20px;
  margin: 0 auto;
  height: fit-content;

  @media (min-width: 700px) {
    padding: 10px 45px 80px 45px;
  }
`;

export const Loading = styled.div`
  min-height: calc(100vh - 260px);
  position: relative;
`;

export const Pagination = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 0.9em;

  @media (min-width: 700px) {
    flex-flow: row;
  }
`;

export const Left = styled.div`
  flex: 1;
  padding: 10px 0 0 0;
  text-align: center;

  @media (min-width: 700px) {
    padding: 15px 0;
    text-align: left;
  }
`;

export const Right = styled.div`
  fflex: 1;
  padding: 5px 0 0 0;
  text-align: center;

  @media (min-width: 700px) {
    padding: 15px 0;
    text-align: right;
  }
`;

export const Button = `
  cursor: pointer;
  color: #00a6e0;
  margin: 0 5px;

  :hover {
    color: #ffcb02;
  }
`;

export const Page = styled.span`
  ${Button}
  font-weight: ${(props) =>
    props.currentPage === props.page ? "bold" : "normal"};
`;

export const First = styled.span`
  ${Button}
  pointer-events: ${(props) => (props.disabled ? "none" : "initial")}
  color: ${(props) => (props.disabled ? "dimgray" : "#00a6e0")}
`;

export const Previous = styled.span`
  ${Button}
  pointer-events: ${(props) => (props.disabled ? "none" : "initial")}
  color: ${(props) => (props.disabled ? "dimgray" : "#00a6e0")}
`;

export const Next = styled.span`
  ${Button}
  pointer-events: ${(props) => (props.disabled ? "none" : "initial")}
  color: ${(props) => (props.disabled ? "dimgray" : "#00a6e0")}
`;

export const Last = styled.span`
  ${Button}
  pointer-events: ${(props) => (props.disabled ? "none" : "initial")}
  color: ${(props) => (props.disabled ? "dimgray" : "#00a6e0")}
`;
