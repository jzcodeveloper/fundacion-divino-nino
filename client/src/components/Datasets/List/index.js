import React from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { getMinutes, formatDate } from "../../../utils/utils";

import ListMenu from "../ListMenu";

import { Container, Item, ID, Title, Details, Margin } from "./styles";

const List = ({ item }) => {
  return (
    <Container>
      <Item>
        <ID>#{item.id}</ID>
        <Title>{item.title}</Title>
        <Details>
          {item.dataset.length} registros totales |{" "}
          {item.trainingDataset.length} de entrenamiento |{" "}
          {item.testingDataset.length} de prueba
        </Details>
      </Item>
      <Item>
        Proporción de división <Margin />
        {item.splitRatio} / {100 - item.splitRatio}
      </Item>
      <Item>Creado el día {formatDate(item.createdAt, "/")}</Item>

      <ListMenu id={item._id} />
    </Container>
  );
};

List.propTypes = {
  item: PropTypes.object.isRequired,
};

List.defaultProps = {
  item: {},
};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(List, areEqual);
