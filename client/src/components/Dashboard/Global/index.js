import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchGlobalStatsRequest } from "../../../store/app/actions";
import { selectLoading, selectGlobalStats } from "../../../store/app/selectors";

import Spinner from "../../UI/Spinner";

import { Container, Flex, Element, Heading, Data } from "./styles";

const Global = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const global = useSelector(selectGlobalStats);

  useEffect(() => {
    dispatch(fetchGlobalStatsRequest());
  }, []);

  return (
    <Container>
      <Flex>
        <Element>
          <Heading>Tareas Creadas</Heading>
          <Data>{global.totalTasks}</Data>
        </Element>
        <Element>
          <Heading>Modelos Creados</Heading>
          <Data>{global.totalModels}</Data>
        </Element>
        <Element>
          <Heading>Usuarios Registrados</Heading>
          <Data>{global.totalContributors}</Data>
        </Element>
      </Flex>
    </Container>
  );
};

export default Global;
