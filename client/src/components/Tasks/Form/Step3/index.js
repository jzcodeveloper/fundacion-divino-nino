import React from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";

import { Column, NoScrollContainer, NoScroll, Labels, Flex } from "./styles";
import { Row, Icon, AddInput, Text, MobileLabel } from "./styles";
import { InputWithIcon } from "./styles";

const Step3 = ({ questions, onChange, addInput, removeInput, locked }) => {
  return (
    <Column>
      <Labels>
        <Label tooltip='Estas son las preguntas como tal que forman parte de la tarea. Cada pregunta está relacionada a un "factor" específico.'>
          Preguntas de la Tarea
        </Label>
        <Label tooltip="Este es el nombre del factor que está relacionado a la pregunta. Este valor debería ser el nombre de la variable.">
          Factor de la Pregunta
        </Label>
        <Label tooltip="Estas son las posibles respuestas que puede tener esta pregunta. Por favor, se debe introducir valores separados por comas.">
          Respuestas de la Pregunta
        </Label>
      </Labels>
      <NoScrollContainer>
        <NoScroll>
          {questions.map(({ question, feature, answers }, index) => (
            <Flex key={index}>
              <Row>
                <MobileLabel tooltip='Esta pregunta forma parte de la tarea. Cada pregunta está relacionada a un "factor" específico.'>
                  Pregunta {index + 1}
                </MobileLabel>
                <Input
                  type="text"
                  name={`question${index}`}
                  defaultValue={question.value}
                  validation={question.validation}
                  onBlur={onChange}
                  data-key="questions"
                  data-index={index}
                  data-subkey="question"
                  autoFocus={index === 0 ? true : false}
                />
              </Row>
              <Row>
                <MobileLabel tooltip="Este es el nombre del factor que está relacionado a la pregunta. Este valor debería ser el nombre de la variable.">
                  Factor de la Pregunta {index + 1}
                </MobileLabel>
                <Input
                  type="text"
                  name={`feature${index}`}
                  defaultValue={feature.value}
                  validation={feature.validation}
                  onBlur={onChange}
                  data-key="questions"
                  data-index={index}
                  data-subkey="feature"
                />
              </Row>
              <Row>
                <MobileLabel tooltip="Estas son las posibles respuestas que puede tener esta pregunta. Por favor, se debe introducir valores separados por comas.">
                  Respuestas de la Pregunta {index + 1}
                </MobileLabel>
                <InputWithIcon>
                  <Input
                    type="text"
                    name={`answers${index}`}
                    defaultValue={answers.value}
                    validation={answers.validation}
                    onBlur={onChange}
                    data-key="questions"
                    data-index={index}
                    data-subkey="answers"
                  />
                  {locked ? null : (
                    <Icon
                      icon="minus-circle"
                      color="#555555"
                      onClick={removeInput}
                      data-key="questions"
                      data-index={index}
                    />
                  )}
                </InputWithIcon>
              </Row>
            </Flex>
          ))}
        </NoScroll>
      </NoScrollContainer>
      {locked ? null : (
        <Row onClick={addInput} data-key="questions">
          <AddInput icon="plus-circle" color="#555555" />
          <Text>Agregar Pregunta</Text>
        </Row>
      )}
    </Column>
  );
};

Step3.propTypes = {};

Step3.defaultProps = {};

export default Step3;
