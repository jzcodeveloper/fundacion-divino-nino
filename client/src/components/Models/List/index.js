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
          {item.inputShape} entrada{item.inputShape === 1 ? "" : "s"} |{" "}
          {item.timesTrained} veces entrenado | {item.timesTested} veces
          evaluado
        </Details>
      </Item>
      <Item>
        Grado de Confianza <Margin />
        {item.timesTrained === 0 ? "N/A" : `${(item.acc * 100).toFixed(2)}%`}
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
