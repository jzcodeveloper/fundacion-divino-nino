import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import mlFunctions from "../../../../data/ml-functions";

import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";
import Select from "../../../Common/CustomSelect";

import { Column, NoScrollContainer, NoScroll, Labels, Flex } from "./styles";
import { Row, MobileLabel } from "./styles";

const Step4 = ({ functions, onChange, removeInput }) => {
  return (
    <Column>
      <Labels>
        <Label tooltip="Determina los pesos óptimos para el modelo al momento del entrenamiento.">
          Función Optimizadora
        </Label>
        <Label tooltip="Esta función define qué tan alejados están los valores estimados con respecto a los valores reales con el fin de optimizar los parámetros de la red neuronal.">
          Función de Error
        </Label>
      </Labels>
      <NoScrollContainer>
        <NoScroll>
          {functions.map(({ optimizer, loss }, index) => (
            <Flex key={index}>
              <Row>
                <MobileLabel tooltip="Determina los pesos óptimos para el modelo al momento del entrenamiento.">
                  Función Optimizadora
                </MobileLabel>
                <Select
                  name="optimizer"
                  defaultValue={optimizer.value}
                  options={mlFunctions.optimizer}
                  onBlur={onChange}
                  data-key="functions"
                  data-index={0}
                  data-subkey="optimizer"
                />
              </Row>
              <Row>
                <MobileLabel tooltip="Esta función define qué tan alejados están los valores estimados con respecto a los valores reales con el fin de optimizar los parámetros de la red neuronal.">
                  Función de Error
                </MobileLabel>
                <Select
                  name="loss"
                  defaultValue={loss.value}
                  options={mlFunctions.loss}
                  onBlur={onChange}
                  data-key="functions"
                  data-index={0}
                  data-subkey="loss"
                />
              </Row>
            </Flex>
          ))}
        </NoScroll>
      </NoScrollContainer>
    </Column>
  );
};

Step4.propTypes = {};

Step4.defaultProps = {};

export default Step4;
