import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import {
  showModelFormRequest,
  showModelViewRequest,
  showModelTrainingViewRequest,
  showModelTestingViewRequest,
  showModelDeleteWarningRequest,
} from "../../../store/modals/actions";
import ListMenuItem from "../ListMenuItem";

import { Container, Button, Icon, Menu } from "./styles";

const ListMenu = ({ id }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const showMenu = useCallback(() => setShow(true), []);

  const hideMenu = useCallback(() => setTimeout(() => setShow(false), 50), []);

  const showModelForm = useCallback(() => {
    dispatch(showModelFormRequest(id));
  }, []);

  const showModelView = useCallback(() => {
    dispatch(showModelViewRequest(id));
  }, []);

  const showTrainingView = useCallback(() => {
    dispatch(showModelTrainingViewRequest(id));
  }, []);

  const showTestingView = useCallback(() => {
    dispatch(showModelTestingViewRequest(id));
  }, []);

  const showDeleteWarning = useCallback(() => {
    dispatch(showModelDeleteWarningRequest(id));
  }, []);

  return (
    <Container>
      <Button onClick={showMenu} onBlur={hideMenu}>
        <Icon icon="ellipsis-v" />
      </Button>

      <Menu show={show}>
        <ListMenuItem
          icon="info-circle"
          caption="Ver Modelo"
          onClick={showModelView}
        />
        <ListMenuItem
          icon="brain"
          caption="Entrenar"
          onClick={showTrainingView}
        />
        <ListMenuItem icon="edit" caption="Evaluar" onClick={showTestingView} />
        <ListMenuItem icon="cog" caption="Ajustar" onClick={showModelForm} />
        <ListMenuItem
          icon="trash-alt"
          caption="Eliminar"
          onClick={showDeleteWarning}
        />
      </Menu>
    </Container>
  );
};

ListMenu.propTypes = {};

ListMenu.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(ListMenu, areEqual);
