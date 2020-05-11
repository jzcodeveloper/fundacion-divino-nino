import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 826px;
`;

export const Charts = styled.div`
  width: 100%;
`;

export const Chart = styled.div`
  margin: 15px 0;

  @media (min-width: 700px) {
    margin: 20px 0;
    width: calc(50% - 12.5px);
    float: left;

    :first-child {
      margin-right: 12.5px;
    }
    :last-child {
      margin-left: 12.5px;
    }
  }
`;

export const Heading = styled.h2`
  position: relative;
  margin: 0 0 30px 0;

  ::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.15);
  }
`;
