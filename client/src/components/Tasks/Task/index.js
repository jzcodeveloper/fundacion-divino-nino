import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import { selectTask } from "../../../store/tasks/selectors";

import Content from "../../../hoc/Content";
import CustomButton from "../../Common/CustomButton";
import NotFound from "../../UI/NotFound";

import { Container, Instructions, Wrapper, Heading, Heading2 } from "./styles";
import { Form, Paragraph, Label, RadioInput, CustomRadio } from "./styles";

const Task = ({ id }) => {
  const exists = useSelector(selectTask(id));

  const [data, setData] = useState(exists);

  const [showInstructions, setShowInstructions] = useState(true);

  const toggleInstructions = useCallback(() => {
    setShowInstructions(!showInstructions);
  }, [showInstructions]);

  if (!exists) return <NotFound />;

  return (
    <Container>
      <Heading>{data.title}</Heading>
      <CustomButton
        onClick={toggleInstructions}
        inverted={showInstructions}
        style={{ marginTop: "18px" }}
      >
        Instrucciones {showInstructions ? <>&#9650;</> : <>&#9660;</>}
      </CustomButton>
      <CSSTransition
        in={showInstructions}
        classNames="expand"
        timeout={300}
        unmountOnExit
      >
        <Instructions>
          <Heading2>Descripción</Heading2>
          <Paragraph>{data.description}</Paragraph>
          <Heading2>Pasos</Heading2>
          {data.steps.map((step, index) => (
            <Paragraph key={index}>
              {index + 1}) {step}
            </Paragraph>
          ))}
          <Heading2>Tips</Heading2>
          {data.tips.map((tip, index) => (
            <Paragraph key={index}>
              <b>{tip.split(":")[0]}</b>: {tip.split(":")[1]}
            </Paragraph>
          ))}
        </Instructions>
      </CSSTransition>

      <Form>
        {data.questions.map(({ question, feature, answers }, index) => (
          <Wrapper key={index}>
            <Heading2>
              Pregunta {index + 1}: {question}
            </Heading2>

            {answers.map((answer, index) => (
              <Paragraph key={index}>
                <Label htmlFor={`${question}-${index}`}>
                  {answer}
                  <RadioInput
                    type="radio"
                    id={`${question}-${index}`}
                    name={feature}
                    value={answer}
                  />
                  <CustomRadio />
                </Label>
              </Paragraph>
            ))}
          </Wrapper>
        ))}
      </Form>
    </Container>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
};

Task.defaultProps = {};

const areEqual = (prevProps, nextProps) => isEqual(prevProps.id, nextProps.id);

export default React.memo(Task, areEqual);
