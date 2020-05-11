import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectModels,
  selectLoading,
  selectModel,
} from "../../store/models/selectors";
import {
  fetchModelsRequest,
  deleteModelRequest,
} from "../../store/models/actions";
import {
  showModelFormRequest,
  hideModelFormRequest,
  hideModelViewRequest,
  hideModelTrainingViewRequest,
  hideModelTestingViewRequest,
  hideModelDeleteWarningRequest,
} from "../../store/modals/actions";
import {
  selectModelId,
  selectModelForm,
  selectModelView,
  selectModelTrainingView,
  selectModelTestingView,
  selectModelDeleteWarning,
} from "../../store/modals/selectors";

import { useFilterBy } from "../../hooks/customHooks";

import Spinner from "../UI/Spinner";
import Search from "../Common/CustomSearch";
import Button from "../Common/CustomButton";
import Warning from "../Common/CustomWarning";
import View from "../Common/CustomView";
import Form from "./Form";
import Model from "./Model";
import Training from "./Training";
import Testing from "./Testing";
import ListItem from "./List";

import { Container, Flex, ListItems, Message, Text, Margin } from "./styles";

const Summary = () => {
  const dispatch = useDispatch();
  const models = useSelector(selectModels);
  const id = useSelector(selectModelId);
  const model = useSelector(selectModel(id));
  const loading = useSelector(selectLoading);
  const modelForm = useSelector(selectModelForm);
  const modelView = useSelector(selectModelView);
  const trainingView = useSelector(selectModelTrainingView);
  const testingView = useSelector(selectModelTestingView);
  const deleteWarning = useSelector(selectModelDeleteWarning);

  const [value, setValue] = useState("");
  const [key, setKey] = useState(0);
  const [data, filtering, filter, setFilter] = useFilterBy(models, {
    title: "",
  });

  useEffect(() => {
    dispatch(fetchModelsRequest());
  }, []);

  useEffect(() => {
    if (key === 13) shouldSetFilter();
  }, [key]);

  const onChange = useCallback((e) => setValue(e.target.value), []);

  const onKeyDown = useCallback((e) => setKey(e.keyCode), []);

  const shouldSetFilter = useCallback(() => {
    setFilter({ [Object.keys(filter)]: value });
  }, [value]);

  const showModelForm = useCallback(() => dispatch(showModelFormRequest()), []);

  const hideModelForm = useCallback(() => dispatch(hideModelFormRequest()), []);

  const hideModelView = useCallback(() => dispatch(hideModelViewRequest()), []);

  const hideModelTrainingView = useCallback(() => {
    dispatch(hideModelTrainingViewRequest());
  }, []);

  const hideModelTestingView = useCallback(() => {
    dispatch(hideModelTestingViewRequest());
  }, []);

  const hideModelDeleteWarning = useCallback(() => {
    dispatch(hideModelDeleteWarningRequest());
  }, []);

  const deleteModel = useCallback(() => {
    dispatch(deleteModelRequest(id));
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
        <Margin />
        <Button onClick={showModelForm} inverted={true}>
          Crear Modelo
        </Button>
      </Flex>

      <ListItems>
        {loading ? (
          <Spinner overlayColor="transparent" />
        ) : data.length > 0 ? (
          data.map((item) => <ListItem key={item._id} item={item} />)
        ) : (
          <Message>No se encontró ningún modelo.</Message>
        )}
      </ListItems>

      <Form show={modelForm} hide={hideModelForm} id={id} />

      <Warning
        show={deleteWarning}
        hide={hideModelDeleteWarning}
        title="Eliminar Modelo"
        subtitle="Antes debe saber que..."
        color="#343434"
        buttons={[
          { backgroundColor: "#fbfbfb", color: "#343434", caption: "Cancelar" },
          {
            backgroundColor: "#343434",
            color: "#fbfbfb",
            caption: "Eliminar",
            onClick: deleteModel,
          },
        ]}
      >
        <Text>
          Al eliminar un modelo, también se eliminarán todos los archivos
          relacionados al entrenamiento del mismo.
        </Text>
      </Warning>

      <View show={modelView} hide={hideModelView}>
        <Model id={id} />
      </View>

      <View show={trainingView} hide={hideModelTrainingView}>
        <Training id={id} />
      </View>

      <View show={testingView} hide={hideModelTestingView}>
        <Testing id={id} />
      </View>
    </Container>
  );
};

export default Summary;
