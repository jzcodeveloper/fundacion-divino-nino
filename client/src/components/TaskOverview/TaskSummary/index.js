import React from "react";
import { useSelector } from "react-redux";

import { getMinutes } from "../../../utils/utils";
import { selectSummaryData } from "../../../store/contributor/selectors";

import Spinner from "../../UI/Spinner";

import { Container, Flex, Element, Heading, Data } from "./styles";

const TaskSummary = () => {
  const data = useSelector(selectSummaryData);

  return (
    <Container>
      <Flex>
        <Element>
          <Heading>Tareas Completadas</Heading>
          <Data>{data.totalTasks}</Data>
        </Element>
        <Element>
          <Heading>Preguntas Respondidas</Heading>
          <Data>{data.totalQuestions}</Data>
        </Element>
        <Element>
          <Heading>Tiempo Invertido</Heading>
          <Data>{getMinutes(data.totalTime)}</Data>
        </Element>
      </Flex>
    </Container>
  );
};

export default TaskSummary;
