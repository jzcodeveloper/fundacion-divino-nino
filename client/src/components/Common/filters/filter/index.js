import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px;
  border-left: 1px solid #d1d8dd;
  border-right: 1px solid #d1d8dd;
  border-bottom: 1px solid #d1d8dd;

  @media (min-width: 750px) {
    width: 80%;
  }
`;

const Filter = () => {
  const [state, setState] = useState({});
  return <Container></Container>;
};

export default Filter;
