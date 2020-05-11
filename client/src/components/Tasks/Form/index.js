import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import { checkValidity } from "../../../utils/utils";
import { selectTask } from "../../../store/tasks/selectors";
import {
  createTaskRequest,
  updateTaskRequest,
} from "../../../store/tasks/actions";

import formModel from "./model";
import Indicator from "./Indicator";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

import { Container, Information, Header, Title, Indicators } from "./styles";
import { Body, Tab, Footer, Left, Right, Label, CheckInput } from "./styles";
import { CustomCheck, Button } from "./styles";

const Form = ({ show, hide, id }) => {
  const task = useSelector(selectTask(id));
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [testOnly, setTestOnly] = useState(false);
  const [state, setState] = useState({
    taskForm: formModel(task),
    isValid: false,
  });

  const { taskForm, isValid } = state;
  const { title, description, questions, tips } = taskForm;

  useEffect(() => {
    setState({
      taskForm: formModel(task),
      isValid: isFormValid(formModel(task), currentTab),
    });
  }, [task]);

  useEffect(() => {
    setState({ ...state, isValid: isFormValid(taskForm, currentTab) });
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
      prevTab < 3 && isFormValid(taskForm, prevTab) ? prevTab + 1 : prevTab
    );
  }, [isValid]);

  const addInput = useCallback(
    (e) => {
      const { key } = e.currentTarget.dataset;
      const newForm = { ...taskForm };

      newForm[key].push(formModel()[key][0]);
      setState({ ...state, taskForm: newForm });
    },
    [taskForm]
  );

  const removeInput = useCallback(
    (e) => {
      const { key, index } = e.currentTarget.dataset;
      const newForm = { ...taskForm };

      if (newForm[key].length <= 1) return;

      newForm[key].splice(index, 1);
      setState({ ...state, taskForm: newForm });
    },
    [taskForm]
  );

  const isFormValid = useCallback((taskForm, currentTab) => {
    let valid = true;

    const keys = Object.keys(taskForm);
    const inputs = taskForm[keys[currentTab]];

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
        if (taskForm[key].value === value) return;
        newForm = { ...taskForm };
        newInput = { ...newForm[key] };
        newInput.value = value;
        newForm[key] = newInput;
      }

      if (key && index && !subkey) {
        if (taskForm[key][index].value === value) return;
        newForm = { ...taskForm };
        newInput = { ...newForm[key][index] };
        newInput.value = value;
        newForm[key][index] = newInput;
      }

      if (key && index && subkey) {
        if (taskForm[key][index][subkey].value === value) return;
        newForm = { ...taskForm };
        newInput = { ...newForm[key][index][subkey] };
        newInput.value = value;
        newForm[key][index][subkey] = newInput;
      }

      setState({
        taskForm: newForm,
        isValid: isFormValid(newForm, currentTab),
      });
    },
    [taskForm, currentTab]
  );

  const onCheckChange = useCallback((e) => {
    const { checked } = e.target;

    setTestOnly(checked);
  }, []);

  const onSubmit = useCallback(() => {
    if (!isFormValid(taskForm, currentTab)) return;

    const formData = {
      title: title.value,
      description: description.value,
      questions: questions.reduce((acc, val, index) => {
        acc.push({
          _id: task ? task.questions[index]._id : undefined,
          question: val.question.value,
          feature: val.feature.value,
          answers: val.answers.value.split(","),
        });
        return acc;
      }, []),
      tips: tips.map((tip) => tip.value),
      testOnly: testOnly,
    };

    if (id) dispatch(updateTaskRequest(id, formData));
    else dispatch(createTaskRequest(formData));

    hideForm();
  }, [taskForm, currentTab, id]);

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
                  Descripción
                </Indicator>
                <Indicator currentTab={currentTab} tabIndex={2}>
                  Preguntas
                </Indicator>
                <Indicator currentTab={currentTab} tabIndex={3}>
                  Tips
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
                        value={description.value}
                        validation={description.validation}
                        onChange={onInputChange}
                      />
                    ) : null}
                    {currentTab === 2 ? (
                      <Step3
                        questions={questions}
                        onChange={onInputChange}
                        addInput={addInput}
                        removeInput={removeInput}
                        locked={task ? true : false}
                      />
                    ) : null}
                    {currentTab === 3 ? (
                      <Step4
                        tips={tips}
                        onChange={onInputChange}
                        addInput={addInput}
                        removeInput={removeInput}
                      />
                    ) : null}
                  </Tab>
                </CSSTransition>
              </TransitionGroup>
            </Body>
            <Footer>
              <Left>
                {!task && currentTab === 2 ? (
                  <Label htmlFor="testOnly">
                    Sólo para evaluación
                    <CheckInput
                      type="checkbox"
                      id="testOnly"
                      name="testOnly"
                      checked={testOnly}
                      onChange={onCheckChange}
                    />
                    <CustomCheck />
                  </Label>
                ) : null}
              </Left>
              <Right>
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
              </Right>
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
