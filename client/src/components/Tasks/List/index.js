import React from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { getMinutes, formatDate } from "../../../utils/utils";

import ListMenu from "../ListMenu";

import { Container, Item, ID, Title, Details } from "./styles";

const List = ({ item }) => {
  return (
    <Container>
      <Item>
        <ID>#{item.id}</ID>
        <Title>{item.title}</Title>
        <Details>
          {item.totalQuestions} preguntas | {item.timesCompleted} completadas |
          ~{getMinutes(item.averageTime)}
        </Details>
      </Item>
      <Item>{item.enabled ? "Habilitada" : "Deshabilitada"}</Item>
      <Item>Creada el día {formatDate(item.createdAt, "/")}</Item>

      <ListMenu id={item._id} enabled={item.enabled} />
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
