import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Filter from "./filter";
import Button from "../button";

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

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Underline = styled.span`
  font-size: 0.75em;
  color: #8d99a6;
  cursor: pointer;
  margin-right: 10px;

  :hover {
    text-decoration: underline;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  path {
    color: ${(props) => props.color || "unset"};
  }
`;

const Filters = () => {
  const [state, setState] = useState([]);

  const addFilter = () => {
    //
  };

  const removeFilter = () => {
    //
  };

  const clearFilters = () => {
    //
  };

  return (
    <>
      <Container>
        <Flex>
          <Button onClick={addFilter} color="#8d99a6">
            Agregar filtro
          </Button>
          <Button onClick={clearFilters} color="#8d99a6">
            Remover filtros
          </Button>
        </Flex>
        <Flex>
          {/* <Underline>{sort.replace("-", "")}</Underline> */}
          <Icon icon="arrow-circle-down" color="#999999" />
        </Flex>
      </Container>
      <Filter />
    </>
  );
};

export default Filters;
