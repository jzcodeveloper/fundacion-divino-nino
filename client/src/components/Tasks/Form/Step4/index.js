import React from "react";
import PropTypes from "prop-types";

import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";

import { Column, NoScrollContainer, NoScroll, Row, Icon } from "./styles";
import { AddInput, Text } from "./styles";

const Step4 = ({ tips, onChange, addInput, removeInput }) => {
  return (
    <Column>
      <Label tooltip="Serie de tips o consejos para ayudar al encuestado a completar la tarea.">
        Tips de la Tarea
      </Label>
      <NoScrollContainer>
        <NoScroll>
          {tips.map((tip, index) => (
            <Row key={`tip${index}`}>
              <Input
                type="text"
                name={`tip${index}`}
                defaultValue={tip.value}
                validation={tip.validation}
                onBlur={onChange}
                data-key="tips"
                data-index={index}
                autoFocus={index === 0 ? true : false}
              />
              <Icon
                icon="minus-circle"
                color="#555555"
                onClick={removeInput}
                data-key="tips"
                data-index={index}
              />
            </Row>
          ))}
        </NoScroll>
      </NoScrollContainer>
      <Row onClick={addInput} data-key="tips">
        <AddInput icon="plus-circle" color="#555555" />
        <Text>Agregar Tip</Text>
      </Row>
    </Column>
  );
};

Step4.propTypes = {};

Step4.defaultProps = {};

export default Step4;
