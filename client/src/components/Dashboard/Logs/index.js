import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchLogsRequest } from "../../../store/admin/actions";
import {
  selectLogsLoading,
  selectResultsByPage,
} from "../../../store/admin/selectors";

import Spinner from "../../UI/Spinner";

import { Container, Heading, NoScrollContainer, NoScroll } from "./styles";
import { Log, Text } from "./styles";

const Logs = () => {
  const dispatch = useDispatch();
  const logs = useSelector(selectResultsByPage(1));
  const loading = useSelector(selectLogsLoading);

  useEffect(() => {
    dispatch(fetchLogsRequest(1));
  }, []);

  return (
    <Container>
      <Heading>Registros de Actividad</Heading>
      <NoScrollContainer>
        <NoScroll>
          {loading ? <Spinner overlayColor="transparent" /> : null}

          {logs.map(({ action, message, createdAt }) => (
            <Log key={createdAt + message}>
              <Text color="#36a2eb">{createdAt}</Text>
              <Text color="#fbfbfb">{message}</Text>
            </Log>
          ))}
        </NoScroll>
      </NoScrollContainer>
    </Container>
  );
};

export default Logs;
