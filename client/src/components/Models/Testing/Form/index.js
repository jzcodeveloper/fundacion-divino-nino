import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import { checkValidity } from "../../../../utils/utils";
import { selectTesting, selectModel } from "../../../../store/models/selectors";

import formModel from "./model";
import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";

import { Container, Body, Inputs, Footer, Button } from "./styles";

const TestingForm = ({ id, onSubmit, file }) => {
  const model = useSelector(selectModel(id));
  const testing = useSelector(selectTesting);

  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    testForm: formModel(model),
    isValid: false,
  });

  const { testForm, isValid } = state;
  const { batchSize } = testForm;

  useEffect(() => {
    setShow(true);
  }, []);

  const isFormValid = useCallback((testForm) => {
    let isValid = true;

    for (const key in testForm) {
      const input = testForm[key];
      input.validation = checkValidity(input.value, input.validators);
      isValid = input.validation[0] && isValid;
    }

    return isValid;
  }, []);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      const newForm = { ...testForm };
      const newInput = { ...newForm[name] };

      newInput.value = value;
      newForm[name] = newInput;

      setState({ testForm: newForm, isValid: isFormValid(newForm) });
    },
    [testForm]
  );

  const onLocalSubmit = useCallback(
    (e) => {
      if (!isFormValid(testForm)) return;

      const formData = new FormData();

      formData.append("file", file);
      formData.append("batchSize", batchSize.value);

      onSubmit(id, formData);
    },
    [testForm, file]
  );

  return show ? (
    <Container>
      <Body>
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
            disabled={testing}
            step={1}
            min={1}
            max={300}
            onBlur={onChange}
          />
        </Inputs>

        <Inputs>
          <Label tooltip="Al hacer click aquí empezará el proceso de evaluación. ¡Recuerda seleccionar un dataset primero!">
            Evaluar
          </Label>
          <Button
            onClick={onLocalSubmit}
            color="#fbfbfb"
            backgroundColor="#343434"
            grayed={!isValid || testing}
            disabled={testing || !file}
          >
            Evaluar
          </Button>
        </Inputs>
      </Body>
    </Container>
  ) : null;
};

TestingForm.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

TestingForm.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(TestingForm, areEqual);
