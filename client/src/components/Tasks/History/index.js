import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchContributorsRequest } from "../../../store/contributors/actions";
import {
  selectLoading,
  selectTotal,
  selectHistoryByPage,
} from "../../../store/contributors/selectors";

import Spinner from "../../UI/Spinner";
import CustomTable from "../../Common/CustomTable";

import { tableStructure } from "./styles";
import { Container, Loading, Pagination, Left, Right, Button } from "./styles";
import { Page, First, Previous, Next, Last } from "./styles";

const History = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const history = useSelector(selectHistoryByPage(currentPage));
  const total = useSelector(selectTotal);
  const loading = useSelector(selectLoading);
  const pages = total === 0 ? 1 : Math.ceil(total / 10);
  const from = (currentPage - 1) * 10 + (total === 0 ? 0 : 1);
  const to = (currentPage - 1) * 10 + history.length;

  useEffect(() => {
    dispatch(fetchContributorsRequest(currentPage, "-totalTasks"));
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
    <Container>
      <CustomTable
        headers={[
          "ID",
          "Correo Electrónico",
          "Nombre de Usuario",
          "Tareas Completadas",
          "Preguntas Respondidas",
          "Tiempo Invertido",
          "Fecha",
        ]}
        data={history}
        structure={tableStructure}
        message="Hasta ahora nadie ha completado una tarea."
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
  );
};

export default History;
