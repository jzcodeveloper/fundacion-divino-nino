import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectDatasets,
  selectLoading,
  selectDataset,
} from "../../store/datasets/selectors";
import {
  fetchDatasetsRequest,
  updateSplitRatioRequest,
  emptyDatasetRequest,
} from "../../store/datasets/actions";
import {
  hideDatasetViewRequest,
  hideDatasetDownloadRequest,
  hideDatasetSplitWarningRequest,
  hideDatasetEmptyWarningRequest,
} from "../../store/modals/actions";
import {
  selectDatasetId,
  selectDatasetView,
  selectDatasetDownload,
  selectDatasetSplitWarning,
  selectDatasetEmptyWarning,
} from "../../store/modals/selectors";

import { useFilterBy } from "../../hooks/customHooks";

import Spinner from "../UI/Spinner";
import Search from "../Common/CustomSearch";
import Button from "../Common/CustomButton";
import Slider from "../Common/CustomSlider";
import Warning from "../Common/CustomWarning";
import View from "../Common/CustomView";
import Dataset from "./Dataset";
import Download from "./Download";
import ListItem from "./List";

import { Container, Flex, ListItems, Message, Text } from "./styles";

const Summary = () => {
  const dispatch = useDispatch();
  const datasets = useSelector(selectDatasets);
  const id = useSelector(selectDatasetId);
  const dataset = useSelector(selectDataset(id));

  const loading = useSelector(selectLoading);
  const datasetView = useSelector(selectDatasetView);
  const datasetDownload = useSelector(selectDatasetDownload);
  const splitWarning = useSelector(selectDatasetSplitWarning);
  const emptyWarning = useSelector(selectDatasetEmptyWarning);
  const splitRatio = dataset ? dataset.splitRatio : 50;

  const [ratio, setRatio] = useState(0);
  const [value, setValue] = useState("");
  const [key, setKey] = useState(0);
  const [data, filtering, filter, setFilter] = useFilterBy(datasets, {
    title: "",
  });

  useEffect(() => {
    dispatch(fetchDatasetsRequest());
  }, []);

  useEffect(() => {
    setRatio(splitRatio);
  }, [splitRatio]);

  useEffect(() => {
    if (key === 13) shouldSetFilter();
  }, [key]);

  const onChange = useCallback((e) => setValue(e.target.value), []);

  const onKeyDown = useCallback((e) => setKey(e.keyCode), []);

  const onSliderChange = useCallback((e) => setRatio(e.target.value), []);

  const shouldSetFilter = useCallback(() => {
    setFilter({ [Object.keys(filter)]: value });
  }, [value]);

  const hideDatasetView = useCallback(() => {
    dispatch(hideDatasetViewRequest());
  }, []);

  const hideDatasetDownload = useCallback(() => {
    dispatch(hideDatasetDownloadRequest());
  }, []);

  const hideDatasetSplitWarning = useCallback(() => {
    dispatch(hideDatasetSplitWarningRequest());
  }, []);

  const hideDatasetEmptyWarning = useCallback(() => {
    dispatch(hideDatasetEmptyWarningRequest());
  }, []);

  const updateSplitRatio = useCallback(() => {
    dispatch(updateSplitRatioRequest(id, { ratio }));
  }, [id, ratio]);

  const emptyDataset = useCallback(() => {
    dispatch(emptyDatasetRequest(id));
  }, [id]);

  return (
    <Container>
      <Flex>
        <Search
          type="text"
          placeholder="Buscar por título"
          name="title"
          value={value}
          onChange={onChange}
          onClick={shouldSetFilter}
          onKeyDown={onKeyDown}
          autoComplete="off"
        />
      </Flex>

      <ListItems>
        {loading ? (
          <Spinner overlayColor="transparent" />
        ) : data.length > 0 ? (
          data.map((item) => <ListItem key={item._id} item={item} />)
        ) : (
          <Message>No se encontró ningún dataset.</Message>
        )}
      </ListItems>

      <Warning
        show={splitWarning}
        hide={hideDatasetSplitWarning}
        title={`Dividir Dataset ${ratio}/${100 - ratio}`}
        subtitle="Antes debe saber que..."
        color="#343434"
        buttons={[
          { backgroundColor: "#fbfbfb", color: "#343434", caption: "Cancelar" },
          {
            backgroundColor: "#343434",
            color: "#fbfbfb",
            caption: "Ajustar",
            onClick: updateSplitRatio,
          },
        ]}
      >
        <Text>
          Es una buena práctica dividir los datos en dos sets, uno de
          entrenamiento y otro de prueba. La razón es muy simple: si se intenta
          evaluar el modelo con los mismos datos que usó para entrenarlo, se
          está haciendo algo poco realista. El punto de un sistema de
          aprendizaje automático es el de trabajar con nuevos datos.
        </Text>
        <Slider
          name="ratio"
          value={ratio}
          onChange={onSliderChange}
          leftMessage={`${ratio}% para entrenamiento`}
          rightMessage={`${100 - ratio}% para prueba`}
        />
      </Warning>

      <Warning
        show={emptyWarning}
        hide={hideDatasetEmptyWarning}
        title="Vaciar Dataset"
        subtitle="Antes debe saber que..."
        color="#343434"
        buttons={[
          { backgroundColor: "#fbfbfb", color: "#343434", caption: "Cancelar" },
          {
            backgroundColor: "#343434",
            color: "#fbfbfb",
            caption: "Vaciar",
            onClick: emptyDataset,
          },
        ]}
      >
        <Text>
          Al vaciar el dataset se eliminarán todos los datos que han sido
          almacenados hasta ahora, sin embargo no se eliminará ni la tarea ni el
          dataset, es decir, la estructura de los mismos se mantendrá igual.
        </Text>
      </Warning>

      <View show={datasetView} hide={hideDatasetView}>
        <Dataset id={id} />
      </View>

      <Download show={datasetDownload} hide={hideDatasetDownload} id={id} />
    </Container>
  );
};

export default Summary;
