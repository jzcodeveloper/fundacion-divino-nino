import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 10px 20px 70px 20px;
  margin: 0 auto;
  height: fit-content;

  @media (min-width: 700px) {
    width: 85%;
    padding: 10px 0 70px 0;
  }
`;

export const Heading = styled.h1`
  position: relative;
  margin: 10px 0 30px 0;

  ::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 700px) {
    margin: 20px 0 30px 0;
  }
`;

export const Text = styled.p`
  margin: 20px 0;
`;

export const Loading = styled.div`
  min-height: calc(100vh - 327px);
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
  flex: 1;
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
