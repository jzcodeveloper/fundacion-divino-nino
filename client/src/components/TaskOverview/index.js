import React from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

import { formatDate, getGreetings } from "../../utils/utils";
import { selectContributor } from "../../store/contributor/selectors";

import Content from "../../hoc/Content";
import TaskSummary from "./TaskSummary/";
import LevelSummary from "./LevelSummary/";
import ActivitySummary from "./ActivitySummary/";

import { Container, Heading, Heading2, Small } from "./styles";

const TaskOverview = () => {
  const contributor = useSelector(selectContributor);

  return (
    <Content>
      <Container>
        <Heading>
          {getGreetings()}, {contributor.username}
        </Heading>
        <Small>
          {contributor.lastSignIn.length === 1
            ? `¡Primera vez que ingresas al sistema! Hoy es ${formatDate(
                contributor.lastSignIn[0]
              )}.`
            : `Se conectó por última vez el día ${formatDate(
                contributor.lastSignIn[0],
                "/"
              )}.`}
        </Small>

        <TaskSummary />

        <Heading2>Resumen de Nivel</Heading2>
        <LevelSummary />

        <Heading2>Tareas Completadas</Heading2>
        <ActivitySummary />
      </Container>
    </Content>
  );
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.location.pathname, nextProps.location.pathname);

export default React.memo(TaskOverview, areEqual);
