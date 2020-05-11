import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";

import { useInterval } from "../../hooks/customHooks";
import { selectTask, selectLoading } from "../../store/task/selectors";
import {
  selectContributor,
  canContinueWorking,
} from "../../store/contributor/selectors";
import { fetchTaskRequest, resetTaskRequest } from "../../store/task/actions";
import { createDataRequest } from "../../store/datasets/actions";

import Content from "../../hoc/Content";
import Spinner from "../UI/Spinner";
import CustomButton from "../Common/CustomButton";
import NotFound from "../UI/NotFound";

import { Container, Instructions, Wrapper, Buttons, Heading } from "./styles";
import { SubHeading, Form, Paragraph, Label, RadioInput } from "./styles";
import { CustomRadio, Message, Title, Subtitle, Loading } from "./styles";

const Task = ({ match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;
  const task = useSelector(selectTask);
  const contributor = useSelector(selectContributor);
  const loading = useSelector(selectLoading);
  const canContinue = useSelector(canContinueWorking(task));

  const [state, setState] = useState({});
  const [time, setTime] = useState(0);
  const [formValidity, setFormValidity] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useInterval(() => {
    setTime((prevState) => prevState + 1);
  }, 1000);

  useEffect(() => {
    window.scrollTo(0, 0);
    setState({});
    setTime(0);
    setFormValidity(false);
    setShowInstructions(true);
  }, [task]);

  useEffect(() => {
    dispatch(fetchTaskRequest(id));
  }, [match]);

  useEffect(() => {
    setFormValidity(isFormValid());
  }, [state]);

  const toggleInstructions = useCallback(() => {
    setShowInstructions(!showInstructions);
  }, [showInstructions]);

  const isFormValid = () => {
    let isValid = false;

    const keys = Object.keys(state);

    if (task) isValid = keys.length === task.questions.length;

    return isValid;
  };

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formValidity) return;

    const formData = {
      time: time * 1000,
      task: task._id,
      contributor: contributor._id,
      data: task.questions.reduce((acc, val, index) => {
        acc[val.feature] = state[val.feature];
        if (task.testOnly && index === task.questions.length - 1)
          acc["salida"] = 0;
        return acc;
      }, {}),
    };

    dispatch(createDataRequest(task.dataset, formData));
    dispatch(fetchTaskRequest(id));
  };

  return loading ? (
    <Loading>
      <Spinner overlayColor="transparent" />
    </Loading>
  ) : task && canContinue ? (
    <Content>
      <Container>
        <Heading>{task.title}</Heading>
        <Buttons>
          <CustomButton
            onClick={toggleInstructions}
            inverted={showInstructions}
          >
            Instrucciones {showInstructions ? <>&#9650;</> : <>&#9660;</>}
          </CustomButton>
        </Buttons>
        <CSSTransition
          in={showInstructions}
          classNames="expand"
          timeout={300}
          unmountOnExit
        >
          <Instructions>
            <SubHeading>Descripción</SubHeading>
            <Paragraph>{task.description}</Paragraph>
            <SubHeading>Pasos</SubHeading>
            {task.steps.map((step, index) => (
              <Paragraph key={index}>
                {index + 1}) {step}
              </Paragraph>
            ))}
            <SubHeading>Tips</SubHeading>
            {task.tips.map((tip, index) => (
              <Paragraph key={index}>
                <b>{tip.split(":")[0]}</b>: {tip.split(":")[1]}
              </Paragraph>
            ))}
          </Instructions>
        </CSSTransition>

        <Form onSubmit={onSubmit}>
          {task.questions.map(({ question, feature, answers }, index) => (
            <Wrapper key={index}>
              <SubHeading>
                Pregunta {index + 1}: {question}
              </SubHeading>

              {answers.map((answer, index) => (
                <Paragraph key={index}>
                  <Label htmlFor={`${question}-${index}`}>
                    {answer}
                    <RadioInput
                      type="radio"
                      id={`${question}-${index}`}
                      data-key={index}
                      name={feature}
                      value={answer}
                      onChange={onChange}
                    />
                    <CustomRadio></CustomRadio>
                  </Label>
                </Paragraph>
              ))}
            </Wrapper>
          ))}

          <CustomButton right={true} inverted={true} grayed={!formValidity}>
            Enviar
          </CustomButton>
        </Form>
      </Container>
    </Content>
  ) : !canContinue ? (
    <Content>
      <Container>
        <Message>
          <Title>¡Has alcanzado el máximo de tareas permitidas!</Title>
          <Subtitle>
            Esta tarea tiene una cantidad limitada de veces que puede ser
            completada por un contribuyente.
          </Subtitle>
        </Message>
      </Container>
    </Content>
  ) : (
    <NotFound />
  );
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.location.pathname, nextProps.location.pathname);

export default React.memo(Task, areEqual);
