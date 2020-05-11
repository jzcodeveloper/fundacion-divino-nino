import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";

import { fetchTasksRequest } from "../../store/tasks/actions";
import {
  selectTasksForTable,
  selectLoading,
} from "../../store/tasks/selectors";

import Content from "../../hoc/Content";
import Spinner from "../UI/Spinner";
import CustomTable from "./CustomTable";

import { Container, Heading, Text, Loading } from "./styles";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasksForTable);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, []);

  return (
    <Content>
      <Container>
        <Heading>Listado de Tareas</Heading>
        <Text>
          Aquí podrás ver todas las tareas disponibles en las que puedes
          participar.
        </Text>
        <Text>¡Ayúdanos a recolectar información!</Text>

        <CustomTable
          headers={[
            "ID",
            "Título",
            "Veces Completada",
            "Preguntas Totales",
            "Tiempo Promedio",
          ]}
          data={tasks}
          message="Actualmente no hay tareas disponibles."
          loading={loading}
        />
      </Container>
    </Content>
  );
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.location.pathname, nextProps.location.pathname);

export default React.memo(TaskList, areEqual);
