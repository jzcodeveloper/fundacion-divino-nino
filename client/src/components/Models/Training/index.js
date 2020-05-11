import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { socket } from "../../../socket";
import PropTypes from "prop-types";

import { formatDate } from "../../../utils/utils";
import { createChartData } from "../../../utils/chart";
import { selectTraining, selectModel } from "../../../store/models/selectors";
import { trainModelRequest } from "../../../store/models/actions";

import CustomChart from "../../Common/CustomChart";
import File from "../../Common/CustomFile";
import Form from "./Form";

import { Container, Wrapper, Heading, Heading2, Grids, Grid } from "./styles";
import { NoScrollContainer, NoScroll, Log, Text } from "./styles";

const Training = ({ id }) => {
  const dispatch = useDispatch();
  const model = useSelector(selectModel(id));
  const divRef = useRef();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    loss: { labels: [], data: [] },
    acc: { labels: [], data: [] },
    logs: [],
  });

  useEffect(() => {
    /* setData({
      loss: { labels: [], data: [] },
      acc: { labels: [], data: [] },
      logs: [],
    }); */

    socket.on("training", (data) => {
      setData((prev) => ({
        loss: {
          labels: [...prev.loss.labels, data.epoch],
          data: [...prev.loss.data, data.loss * 100],
        },
        acc: {
          labels: [...prev.acc.labels, data.epoch],
          data: [...prev.acc.data, data.acc * 100],
        },
        logs: [...prev.logs, data.lossLog, data.accLog],
      }));
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [data.logs]);

  const onChange = useCallback((file) => setFile(file), []);

  const scrollToBottom = useCallback(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [divRef]);

  const trainModel = useCallback((id, formData) => {
    dispatch(trainModelRequest(id, formData));
  }, []);

  return (
    <Container>
      <Heading>{model.title}</Heading>
      <Grids>
        <Grid>
          <Heading2>Selección del Dataset</Heading2>
          <Wrapper>
            <File
              accept="text/csv,application/vnd.ms-excel"
              extensions="csv"
              message="Selecciona un archivo o suéltalo aquí"
              error="Por favor, sube un archivo .csv"
              caption="Subir un archivo"
              onChange={onChange}
            />
          </Wrapper>
        </Grid>
        <Grid>
          <Heading2>Parámetros de Entrenamiento</Heading2>
          <Form id={id} onSubmit={trainModel} file={file} />
        </Grid>
      </Grids>

      <Grids>
        <Grid>
          <Heading2>Gráfico de Error</Heading2>
          <CustomChart
            type="line"
            data={createChartData(
              data.loss.labels,
              data.loss.data,
              "Valor de Error"
            )}
          />
        </Grid>

        <Grid>
          <Heading2>Gráfico de Confianza</Heading2>
          <CustomChart
            type="line"
            data={createChartData(
              data.acc.labels,
              data.acc.data,
              "Valor de Confianza"
            )}
          />
        </Grid>
      </Grids>

      <Heading2>Registros</Heading2>

      <NoScrollContainer>
        <NoScroll ref={divRef}>
          {data.logs.map(({ date, epoch, metric, value }) => (
            <Log key={date + value}>
              <Text color="#36a2eb">{date}</Text>
              <Text color="#fbfbfb">{`{ "epoch": ${epoch}, "metrica": "${metric}", "valor": ${value} }`}</Text>
            </Log>
          ))}
        </NoScroll>
      </NoScrollContainer>
    </Container>
  );
};

Training.propTypes = {
  id: PropTypes.string.isRequired,
};

Training.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps.id, nextProps.id);

export default React.memo(Training, areEqual);
