import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import {
  showTaskFormRequest,
  showTaskViewRequest,
  showTaskDisableWarningRequest,
  showTaskDeleteWarningRequest,
} from "../../../store/modals/actions";

import ListMenuItem from "../ListMenuItem";

import { Container, Button, Icon, Menu } from "./styles";

const ListMenu = ({ id, enabled }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const showMenu = useCallback(() => setShow(true), []);

  const hideMenu = useCallback(() => setTimeout(() => setShow(false), 50), []);

  const showTaskForm = useCallback(() => dispatch(showTaskFormRequest(id)), []);

  const showTaskView = useCallback(() => dispatch(showTaskViewRequest(id)), []);

  const showTaskDisableWarning = useCallback(() => {
    dispatch(showTaskDisableWarningRequest(id));
  }, []);

  const showTaskDeleteWarning = useCallback(() => {
    dispatch(showTaskDeleteWarningRequest(id));
  }, []);

  return (
    <Container>
      <Button onClick={showMenu} onBlur={hideMenu}>
        <Icon icon="ellipsis-v" />
      </Button>

      <Menu show={show}>
        <ListMenuItem
          icon="info-circle"
          caption="Ver Encuesta"
          onClick={showTaskView}
        />
        <ListMenuItem
          icon={enabled ? "eye-slash" : "eye"}
          caption={enabled ? "Deshabilitar" : "Habilitar"}
          onClick={showTaskDisableWarning}
        />
        <ListMenuItem icon="edit" caption="Modificar" onClick={showTaskForm} />
        <ListMenuItem
          icon="trash-alt"
          caption="Eliminar"
          onClick={showTaskDeleteWarning}
        />
      </Menu>
    </Container>
  );
};

ListMenu.propTypes = {
  id: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
};

ListMenu.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(ListMenu, areEqual);
