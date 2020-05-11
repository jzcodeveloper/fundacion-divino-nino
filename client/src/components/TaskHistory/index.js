import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";

import { fetchHistoryRequest } from "../../store/contributor/actions";
import {
  selectHistoryLoading,
  selectHistoryTotal,
  selectHistoryByPage,
} from "../../store/contributor/selectors";

import Content from "../../hoc/Content";
import Spinner from "../UI/Spinner";
import CustomTable from "../Common/CustomTable";

import { Container, Heading, Text, Loading, Pagination } from "./styles";
import { Left, Right, Button, Page, First, Previous } from "./styles";
import { Next, Last } from "./styles";

const TaskHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const history = useSelector(selectHistoryByPage(currentPage));
  const total = useSelector(selectHistoryTotal);
  const loading = useSelector(selectHistoryLoading);
  const pages = total === 0 ? 1 : Math.ceil(total / 10);
  const from = (currentPage - 1) * 10 + total === 0 ? 0 : 1;
  const to = (currentPage - 1) * 10 + history.length;

  useEffect(() => {
    dispatch(fetchHistoryRequest(currentPage));
  }, [currentPage]);

  const setFirstPage = useCallback(() => setCurrentPage(1), []);

  const setPrevPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage - 1);
  }, []);

  const setNextPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const setLastPage = useCallback(() => setCurrentPage(pages), []);

  const setPage = useCallback((e) => setCurrentPage(e.target.dataset.page), []);

  return (
    <Content>
      <Container>
        <Heading>Historial de Tareas</Heading>
        <Text>
          Aquí podrás ver el historial de todas las tareas que has completado
          hasta ahora.
        </Text>
        <Text>¡Muchas gracias por participar en nuestras encuestas!</Text>

        <CustomTable
          headers={[
            "ID",
            "Título",
            "Tareas Completadas",
            "Preguntas Respondidas",
            "Tiempo Invertido",
            "Fecha",
          ]}
          data={history}
          message="Hasta ahora no has completado ninguna tarea."
          loading={loading}
        />

        <Pagination>
          <Left>
            Mostrando entradas del {from} al {to} de un total de {total}
          </Left>
          <Right>
            <First onClick={setFirstPage} disabled={currentPage === 1}>
              Primero
            </First>
            <Previous onClick={setPrevPage} disabled={currentPage === 1}>
              Anterior
            </Previous>

            {new Array(pages).fill(0).map((page, i) => (
              <Page
                key={i}
                onClick={setCurrentPage}
                page={i + 1}
                data-page={i + 1}
                currentPage={currentPage}
              >
                {i + 1}
              </Page>
            ))}

            <Next onClick={setNextPage} disabled={currentPage === pages}>
              Siguiente
            </Next>
            <Last onClick={setLastPage} disabled={currentPage === pages}>
              Último
            </Last>
          </Right>
        </Pagination>
      </Container>
    </Content>
  );
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.location.pathname, nextProps.location.pathname);

export default React.memo(TaskHistory, areEqual);
