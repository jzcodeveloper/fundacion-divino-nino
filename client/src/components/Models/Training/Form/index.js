import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { checkValidity } from "../../../../utils/utils";
import {
  selectTraining,
  selectModel,
} from "../../../../store/models/selectors";

import formModel from "./model";
import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";

import { Container, Body, Inputs, Footer, Button } from "./styles";

const TrainingForm = ({ id, onSubmit, file }) => {
  const model = useSelector(selectModel(id));
  const training = useSelector(selectTraining);

  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    trainForm: formModel(model),
    isValid: false,
  });

  const { trainForm, isValid } = state;
  const { epochs, batchSize, learningRate } = trainForm;

  useEffect(() => {
    setShow(true);
  }, []);

  const isFormValid = useCallback((trainForm) => {
    let isValid = true;

    for (const key in trainForm) {
      const input = trainForm[key];
      input.validation = checkValidity(input.value, input.validators);
      isValid = input.validation[0] && isValid;
    }

    return isValid;
  }, []);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      const newForm = { ...trainForm };
      const newInput = { ...newForm[name] };

      newInput.value = value;
      newForm[name] = newInput;

      setState({ trainForm: newForm, isValid: isFormValid(newForm) });
    },
    [trainForm]
  );

  const onLocalSubmit = useCallback(
    (e) => {
      if (!isFormValid(trainForm)) return;

      const formData = new FormData();

      formData.append("file", file);
      formData.append("epochs", epochs.value);
      formData.append("batchSize", batchSize.value);
      formData.append("learningRate", learningRate.value);

      onSubmit(id, formData);
    },
    [trainForm, file]
  );

  return show ? (
    <Container>
      <Body>
        <Inputs>
          <Label
            tooltip="Ocurre cuando cada una de las instancias del dataset de
              entrenamiento es pasado al modelo al menos una vez. Generalmente
              mientras más epochs el modelo aprenderá mejor a predecir datos."
          >
            Epochs
          </Label>
          <Input
            type="number"
            name="epochs"
            defaultValue={epochs.value}
            validation={epochs.validation}
            disabled={training}
            step={1}
            min={1}
            max={1000}
            onBlur={onChange}
            autoFocus
          />
        </Inputs>

        <Inputs>
          <Label
            tooltip="Un batch es un conjunto de instancias que se pasan en una
              iteración. Por ejemplo, si tienes 80 ejemplos y un tamaño de batch
              de 16. Significa que los datos serán divididos 80 / 16 = 4
              batches."
          >
            Tamaño del Batch
          </Label>
          <Input
            type="number"
            name="batchSize"
            defaultValue={batchSize.value}
            validation={batchSize.validation}
            disabled={training}
            step={1}
            min={1}
            max={300}
            onBlur={onChange}
          />
        </Inputs>

        <Inputs>
          <Label
            tooltip="¡Ten Cuidado! Pequeños cambios en este valor pueden producir
              Subajustes o Sobreajustes."
          >
            Taza de Aprendizaje
          </Label>
          <Input
            type="number"
            name="learningRate"
            defaultValue={learningRate.value}
            validation={learningRate.validation}
            disabled={training}
            step={0.01}
            min={0.01}
            max={0.1}
            onBlur={onChange}
          />
        </Inputs>
        <Inputs>
          <Label tooltip="Al hacer click aquí empezará el entrenamiento. Durante el proceso, no podrás cambiar ninguno de los parámetros ni volver a entrenar. ¡Recuerda seleccionar un dataset primero!">
            Entrenar
          </Label>
          <Button
            onClick={onLocalSubmit}
            color="#fbfbfb"
            backgroundColor="#343434"
            grayed={!isValid || training}
            disabled={training || !file}
          >
            {training ? "Entrenando..." : "Entrenar"}
          </Button>
        </Inputs>
      </Body>
    </Container>
  ) : null;
};

TrainingForm.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

TrainingForm.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(TrainingForm, areEqual);
