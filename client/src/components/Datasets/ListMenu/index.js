import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import {
  showDatasetViewRequest,
  showDatasetDownloadRequest,
  showDatasetSplitWarningRequest,
  showDatasetEmptyWarningRequest,
} from "../../../store/modals/actions";

import ListMenuItem from "../ListMenuItem";

import { Container, Button, Icon, Menu } from "./styles";

const ListMenu = ({ id }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const showMenu = useCallback(() => setShow(true), []);

  const hideMenu = useCallback(() => setTimeout(() => setShow(false), 50), []);

  const showDatasetView = useCallback(() => {
    dispatch(showDatasetViewRequest(id));
  }, []);

  const showDatasetDownload = useCallback(() => {
    dispatch(showDatasetDownloadRequest(id));
  }, []);

  const showSplitWarning = useCallback(() => {
    dispatch(showDatasetSplitWarningRequest(id));
  }, []);

  const showEmptyWarning = useCallback(() => {
    dispatch(showDatasetEmptyWarningRequest(id));
  }, []);

  return (
    <Container>
      <Button onClick={showMenu} onBlur={hideMenu}>
        <Icon icon="ellipsis-v" />
      </Button>

      <Menu show={show}>
        <ListMenuItem
          icon="chart-pie"
          caption="Ver Estadísticas"
          onClick={showDatasetView}
        />
        <ListMenuItem
          icon="edit"
          caption="Ajustar División"
          onClick={showSplitWarning}
        />
        <ListMenuItem
          icon="trash-alt"
          caption="Vaciar Dataset"
          onClick={showEmptyWarning}
        />
        <ListMenuItem
          icon="download"
          caption="Exportar como CSV"
          onClick={showDatasetDownload}
        />
      </Menu>
    </Container>
  );
};

ListMenu.propTypes = {
  id: PropTypes.string.isRequired,
};

ListMenu.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps.id, nextProps.id);

export default React.memo(ListMenu, areEqual);
