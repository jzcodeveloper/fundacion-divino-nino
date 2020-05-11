import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { socket } from "../../../socket";
import PropTypes from "prop-types";

import { formatDate } from "../../../utils/utils";
import { createChartData } from "../../../utils/chart";
import { selectTraining, selectModel } from "../../../store/models/selectors";
import { testModelRequest } from "../../../store/models/actions";

import CustomChart from "../../Common/CustomChart";
import File from "../../Common/CustomFile";
import Form from "./Form";

import { Container, Wrapper, Heading, Heading2, Grids, Grid } from "./styles";
import { NoScrollContainer, NoScroll, Log, Text } from "./styles";

const Testing = ({ id }) => {
  const dispatch = useDispatch();
  const model = useSelector(selectModel(id));
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("testing", ({ dataset, predictions }) => {
      const labels = Object.values(model.labels);

      let current = 0;

      setData(
        dataset.map((data, index) => {
          const keys = Object.keys(data);
          keys.pop();
          const values = Object.values(data);
          values.pop();

          return {
            instance: { labels: keys, data: values },
            prediction: {
              labels: labels[labels.length - 1],
              data: labels[labels.length - 1].reduce((acc, val, index) => {
                acc[index] = predictions[current + index];
                if (index === labels[labels.length - 1].length - 1)
                  current += labels[labels.length - 1].length;

                return acc;
              }, []),
            },
          };
        })
      );
    });
  }, []);

  const onChange = useCallback((file) => setFile(file), []);

  const testModel = useCallback((id, formData) => {
    setData([]);

    dispatch(testModelRequest(id, formData));
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
          <Heading2>Parámetros de Evaluación</Heading2>
          <Form id={id} onSubmit={testModel} file={file} />
        </Grid>
      </Grids>

      {data.map(({ instance, prediction }, index) => (
        <Grids key={index}>
          <Grid>
            <Heading2>Instancia {index + 1}</Heading2>
            <NoScrollContainer>
              <NoScroll>
                <Text color="#fbfbfb">{`{`}</Text>
                {instance.labels.map((label, index) => (
                  <Log key={index}>
                    <Text color="#fbfbfb">
                      {label}:{" "}
                      {isNaN(instance.data[index])
                        ? `"${instance.data[index]}"`
                        : instance.data[index]}
                      {index === instance.labels.length - 1 ? "" : ","}
                    </Text>
                  </Log>
                ))}
                <Text color="#fbfbfb">{`}`}</Text>
              </NoScroll>
            </NoScrollContainer>
          </Grid>

          <Grid>
            <Heading2>Predicción {index + 1}</Heading2>
            <CustomChart
              type="pie"
              displayAxes={false}
              delay={index * 1000}
              data={createChartData(
                prediction.labels,
                prediction.data,
                "Valor"
              )}
            />
          </Grid>
        </Grids>
      ))}
    </Container>
  );
};

Testing.propTypes = {
  id: PropTypes.string.isRequired,
};

Testing.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps.id, nextProps.id);

export default React.memo(Testing, areEqual);
