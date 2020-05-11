import React from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import { selectModel, selectLoading } from "../../../store/models/selectors";

import Content from "../../../hoc/Content";
import CustomButton from "../../Common/CustomButton";
import CustomChart from "../../Common/CustomChart";
import NotFound from "../../UI/NotFound";
import Spinner from "../../UI/Spinner";

import { Container, Wrapper, Heading, Heading2, Paragraph } from "./styles";
import { Loading } from "./styles";

const Model = ({ id }) => {
  const model = useSelector(selectModel);
  const loading = useSelector(selectLoading);

  return loading ? (
    <Loading>
      <Spinner overlayColor="transparent" />
    </Loading>
  ) : model ? (
    <Container>
      <Heading>{model.title}</Heading>

      <Wrapper>
        <Heading2>Resumen</Heading2>
        <Paragraph>
          A continuación se mostrarán información general sobre el modelo
          actual.
        </Paragraph>
      </Wrapper>
    </Container>
  ) : (
    <NotFound />
  );
};

Model.propTypes = {
  id: PropTypes.string.isRequired,
};

Model.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps.id, nextProps.id);

export default React.memo(Model, areEqual);
