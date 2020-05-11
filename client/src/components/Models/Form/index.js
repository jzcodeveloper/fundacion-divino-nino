import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import { checkValidity } from "../../../utils/utils";
import { selectModel } from "../../../store/models/selectors";
import {
  createModelRequest,
  updateModelRequest,
} from "../../../store/models/actions";

import formModel from "./model";

import Indicator from "./Indicator";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

import { Container, Information, Header, Title, Indicators } from "./styles";
import { Body, Tab, Footer, Button } from "./styles";

const Form = ({ show, hide, id }) => {
  const model = useSelector(selectModel(id));
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [state, setState] = useState({
    modelForm: formModel(model),
    isValid: false,
  });

  const { modelForm, isValid } = state;
  const { title, inputShape, layers, functions } = modelForm;

  useEffect(() => {
    setState({
      modelForm: formModel(model),
      isValid: isFormValid(formModel(model), currentTab),
    });
  }, [model]);

  useEffect(() => {
    setState({ ...state, isValid: isFormValid(modelForm, currentTab) });
  }, [currentTab]);

  const showForm = useCallback(() => setAnimate(true), []);

  const hideForm = useCallback(() => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentTab(0);
      hide();
    }, 300);
  }, []);

  const setPreviousTab = useCallback(() => {
    setCurrentTab((prevTab) => (prevTab > 0 ? prevTab - 1 : 0));
  }, []);

  const setNextTab = useCallback(() => {
    setCurrentTab((prevTab) =>
      prevTab < 3 && isFormValid(modelForm, prevTab) ? prevTab + 1 : prevTab
    );
  }, [isValid]);

  const addInput = useCallback(
    (e) => {
      const { key } = e.currentTarget.dataset;
      const newForm = { ...modelForm };

      newForm[key].push(formModel()[key][0]);
      setState({ ...state, modelForm: newForm });
    },
    [modelForm]
  );

  const removeInput = useCallback(
    (e) => {
      const { key, index } = e.currentTarget.dataset;
      const newForm = { ...modelForm };

      if (newForm[key].length <= 1) return;

      newForm[key].splice(index, 1);
      setState({ ...state, modelForm: newForm });
    },
    [modelForm]
  );

  const isFormValid = useCallback((modelForm, currentTab) => {
    let valid = true;

    const keys = Object.keys(modelForm);
    const inputs = modelForm[keys[currentTab]];

    if (Array.isArray(inputs)) {
      for (const input of inputs) {
        if (input.validation) {
          input.validation = checkValidity(input.value, input.validators);
          valid = input.validation[0] && valid;
          continue;
        }

        for (const key in input) {
          const element = input[key];
          element.validation = checkValidity(element.value, element.validators);
          valid = element.validation[0] && valid;
        }
      }
      return valid;
    }

    inputs.validation = checkValidity(inputs.value, inputs.validators);
    valid = inputs.validation[0] && valid;
    return valid;
  }, []);

  const onInputChange = useCallback(
    (e) => {
      const { key, index, subkey } = e.target.dataset;
      const { value } = e.target;
      let newForm = {};
      let newInput = {};

      if (key && !index && !subkey) {
        if (modelForm[key].value === value) return;
        newForm = { ...modelForm };
        newInput = { ...newForm[key] };
        newInput.value = value;
        newForm[key] = newInput;
      }

      if (key && index && !subkey) {
        if (modelForm[key][index].value === value) return;
        newForm = { ...modelForm };
        newInput = { ...newForm[key][index] };
        newInput.value = value;
        newForm[key][index] = newInput;
      }

      if (key && index && subkey) {
        if (modelForm[key][index][subkey].value === value) return;
        newForm = { ...modelForm };
        newInput = { ...newForm[key][index][subkey] };
        newInput.value = value;
        newForm[key][index][subkey] = newInput;
      }

      setState({
        modelForm: newForm,
        isValid: isFormValid(newForm, currentTab),
      });
    },
    [modelForm, currentTab]
  );

  const onSubmit = useCallback(() => {
    if (!isFormValid(modelForm, currentTab)) return;

    const formData = {
      title: title.value,
      inputShape: inputShape.value,
      layers: layers.map(({ type, units, activation }) => ({
        class: type.value,
        units: units.value,
        activation: activation.value,
      })),
      optimizer: functions[0].optimizer.value,
      loss: functions[0].loss.value,
    };

    if (id) dispatch(updateModelRequest(id, formData));
    else dispatch(createModelRequest(formData));

    hideForm();
  }, [modelForm, currentTab, id]);

  return (
    <CSSTransition
      in={show}
      timeout={{ enter: 0, exit: 300 }}
      classNames="fade"
      onEntered={showForm}
      unmountOnExit
    >
      <Container>
        <CSSTransition
          in={animate}
          classNames="scale"
          timeout={{ enter: 0, exit: 300 }}
          unmountOnExit
        >
          <Information>
            <Header color="#343434">
              <Indicators currentTab={currentTab}>
                <Indicator currentTab={currentTab} tabIndex={0}>
                  Título
                </Indicator>
                <Indicator currentTab={currentTab} tabIndex={1}>
                  Entradas
                </Indicator>
                <Indicator currentTab={currentTab} tabIndex={2}>
                  Estructura
                </Indicator>
                <Indicator currentTab={currentTab} tabIndex={3}>
                  Funciones
                </Indicator>
              </Indicators>
            </Header>
            <Body>
              <TransitionGroup style={{ width: "50%" }}>
                <CSSTransition key={currentTab} timeout={300} classNames="tab">
                  <Tab>
                    {currentTab === 0 ? (
                      <Step1
                        value={title.value}
                        validation={title.validation}
                        onChange={onInputChange}
                      />
                    ) : null}
                    {currentTab === 1 ? (
                      <Step2
                        value={inputShape.value}
                        validation={inputShape.validation}
                        onChange={onInputChange}
                      />
                    ) : null}
                    {currentTab === 2 ? (
                      <Step3
                        layers={layers}
                        onChange={onInputChange}
                        addInput={addInput}
                        removeInput={removeInput}
                      />
                    ) : null}
                    {currentTab === 3 ? (
                      <Step4 functions={functions} onChange={onInputChange} />
                    ) : null}
                  </Tab>
                </CSSTransition>
              </TransitionGroup>
            </Body>
            <Footer>
              <Button
                onClick={currentTab > 0 ? setPreviousTab : hideForm}
                color="#343434"
                backgroundColor="#fbfbfb"
              >
                {currentTab > 0 ? "Regresar" : "Cancelar"}
              </Button>
              <Button
                onClick={currentTab < 3 ? setNextTab : onSubmit}
                color="#fbfbfb"
                backgroundColor="#343434"
                grayed={!isValid}
              >
                {currentTab < 3 ? "Siguiente" : "Guardar"}
              </Button>
            </Footer>
          </Information>
        </CSSTransition>
      </Container>
    </CSSTransition>
  );
};

Form.propTypes = {
  id: PropTypes.string,
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

Form.defaultProps = {
  show: false,
};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(Form, areEqual);
