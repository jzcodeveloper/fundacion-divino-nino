import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import {
  selectDataset,
  selectLoading,
  selectGlobalDataForChart,
} from "../../../store/dataset/selectors";
import { fetchDatasetRequest } from "../../../store/dataset/actions";

import Content from "../../../hoc/Content";
import CustomButton from "../../Common/CustomButton";
import CustomChart from "../../Common/CustomChart";
import NotFound from "../../UI/NotFound";
import Spinner from "../../UI/Spinner";

import { Container, Wrapper, Heading, Heading2, Paragraph } from "./styles";
import { Charts, Chart, Loading } from "./styles";

const Dataset = ({ id }) => {
  const dispatch = useDispatch();
  const dataset = useSelector(selectDataset);
  const loading = useSelector(selectLoading);
  const global = useSelector(selectGlobalDataForChart);

  useEffect(() => {
    dispatch(fetchDatasetRequest(id));
  }, [id]);

  return loading ? (
    <Loading>
      <Spinner overlayColor="transparent" />
    </Loading>
  ) : dataset ? (
    <Container>
      <Heading>{dataset.title}</Heading>

      <Wrapper>
        <Heading2>Resumen</Heading2>
        <Paragraph>
          A continuación se mostrarán una serie de gráficos para visualizar la
          totalidad de respuestas así como también su distribución.
        </Paragraph>
      </Wrapper>

      <Charts>
        {global.map(({ question, ...rest }, i) => (
          <Chart key={i}>
            <Heading2 color="unset">
              Ítem {i + 1}: {question}
            </Heading2>
            <CustomChart
              type="pie"
              displayAxes={false}
              delay={i * 1000}
              data={{ ...rest }}
            />
          </Chart>
        ))}
      </Charts>
    </Container>
  ) : (
    <NotFound />
  );
};

Dataset.propTypes = {
  id: PropTypes.string.isRequired,
};

Dataset.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps.id, nextProps.id);

export default React.memo(Dataset, areEqual);
