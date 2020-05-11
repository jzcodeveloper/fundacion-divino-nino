import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectTasks,
  selectLoading,
  selectTask,
} from "../../store/tasks/selectors";
import {
  fetchTasksRequest,
  deleteTaskRequest,
  disableTaskRequest,
} from "../../store/tasks/actions";
import {
  showTaskFormRequest,
  hideTaskFormRequest,
  hideTaskViewRequest,
  hideTaskDisableWarningRequest,
  hideTaskDeleteWarningRequest,
} from "../../store/modals/actions";
import {
  selectTaskId,
  selectTaskForm,
  selectTaskView,
  selectTaskDisableWarning,
  selectTaskDeleteWarning,
} from "../../store/modals/selectors";
import { useFilterBy } from "../../hooks/customHooks";

import Spinner from "../UI/Spinner";
import Search from "../Common/CustomSearch";
import Button from "../Common/CustomButton";
import Warning from "../Common/CustomWarning";
import View from "../Common/CustomView";
import Form from "./Form";
import Task from "./Task";
import ListItem from "./List";

import { Container, Flex, ListItems, Message, Text, Margin } from "./styles";

const Summary = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const id = useSelector(selectTaskId);
  const task = useSelector(selectTask(id));
  const loading = useSelector(selectLoading);
  const taskForm = useSelector(selectTaskForm);
  const taskView = useSelector(selectTaskView);
  const disableWarning = useSelector(selectTaskDisableWarning);
  const deleteWarning = useSelector(selectTaskDeleteWarning);
  const enabled = task ? task.enabled : false;

  const [value, setValue] = useState("");
  const [key, setKey] = useState(0);
  const [data, filtering, filter, setFilter] = useFilterBy(tasks, {
    title: "",
  });

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, []);

  useEffect(() => {
    if (key === 13) shouldSetFilter();
  }, [key]);

  const onChange = useCallback((e) => setValue(e.target.value), []);

  const onKeyDown = useCallback((e) => setKey(e.keyCode), []);

  const shouldSetFilter = useCallback(() => {
    setFilter({ [Object.keys(filter)]: value });
  }, [value]);

  const showTaskForm = useCallback(() => dispatch(showTaskFormRequest()), []);

  const hideTaskForm = useCallback(() => dispatch(hideTaskFormRequest()), []);

  const hideTaskView = useCallback(() => dispatch(hideTaskViewRequest()), []);

  const hideTaskDisableWarning = useCallback(() => {
    dispatch(hideTaskDisableWarningRequest());
  }, []);

  const hideTaskDeleteWarning = useCallback(() => {
    dispatch(hideTaskDeleteWarningRequest());
  }, []);

  const deleteTask = useCallback(() => {
    dispatch(deleteTaskRequest(id));
  }, [id]);

  const disableTask = useCallback(() => {
    dispatch(disableTaskRequest(id));
  }, [id]);

  return (
    <Container>
      <Flex>
        <Search
          type="text"
          placeholder="Buscar por título"
          name="title"
          value={value}
          onChange={onChange}
          onClick={shouldSetFilter}
          onKeyDown={onKeyDown}
          autoComplete="off"
        />
        <Margin />
        <Button onClick={showTaskForm} inverted={true}>
          Crear Tarea
        </Button>
      </Flex>

      <ListItems>
        {loading ? (
          <Spinner overlayColor="transparent" />
        ) : data.length > 0 ? (
          data.map((item) => <ListItem key={item._id} item={item} />)
        ) : (
          <Message>No se encontró ninguna tarea.</Message>
        )}
      </ListItems>

      <Form show={taskForm} hide={hideTaskForm} id={id} />

      <Warning
        show={disableWarning}
        hide={hideTaskDisableWarning}
        title={`${enabled ? "Deshabilitar" : "Habilitar"} Tarea`}
        subtitle="Antes debe saber que..."
        color="#343434"
        buttons={[
          { backgroundColor: "#fbfbfb", color: "#343434", caption: "Cancelar" },
          {
            backgroundColor: "#343434",
            color: "#fbfbfb",
            caption: `${enabled ? "Deshabilitar" : "Habilitar"}`,
            onClick: disableTask,
          },
        ]}
      >
        <Text>
          Usted como administrador puede deshabilitar o habilitar tareas para de
          esta manera controlar la visibilidad de las mismas en el listado de
          tareas. Esto quiere decir que si la tarea se encuentra habilitada el
          encuestado podrá ver dicha tarea, en caso contrario, no aparecerá en
          el listado.
        </Text>
      </Warning>

      <Warning
        show={deleteWarning}
        hide={hideTaskDeleteWarning}
        title="Eliminar Tarea"
        subtitle="Antes debe saber que..."
        color="#343434"
        buttons={[
          { backgroundColor: "#fbfbfb", color: "#343434", caption: "Cancelar" },
          {
            backgroundColor: "#343434",
            color: "#fbfbfb",
            caption: "Eliminar",
            onClick: deleteTask,
          },
        ]}
      >
        <Text>
          Al eliminar una tarea, también se eliminará el dataset asociado a la
          misma, sin embargo, el modelo asociado no perderá el entrenamiento
          previo, de esta manera, todavía será posible realizar predicciones
          utilizando dichos modelos.
        </Text>
      </Warning>

      <View show={taskView} hide={hideTaskView}>
        <Task id={id} />
      </View>
    </Container>
  );
};

export default Summary;
