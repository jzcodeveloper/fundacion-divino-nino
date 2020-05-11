import React from "react";
import PropTypes from "prop-types";

import mlFunctions from "../../../../data/ml-functions";

import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";
import Select from "../../../Common/CustomSelect";

import { Column, NoScrollContainer, NoScroll, Labels, Flex } from "./styles";
import { Row, Icon, AddInput, Text, MobileLabel } from "./styles";
import { InputWithIcon } from "./styles";

const Step3 = ({ layers, onChange, addInput, removeInput }) => {
  return (
    <Column>
      <Labels>
        <Label tooltip="Existen varios tipos de capa dependiendo del problema de aprendizaje automático. Pero la más común en problemas de regresión logística es una capa densa o totalmente conectada.">
          Tipo de Capa
        </Label>
        <Label tooltip="Cada una de las unidades básicas que conforman la red neuronal. Mientras más neuronas más eficiente es el modelo, sin embargo, el tiempo de entrenamiento aumenta considerablemente y puede producirse un Sobreajuste.">
          Neuronas de la Capa
        </Label>
        <Label tooltip="Esta función determina las salidas de cada neurona en la red neuronal. Toma el valor de entrada transformándola en un valor entre 0 y 1 ó -1 y 1.">
          Función de Activación
        </Label>
      </Labels>
      <NoScrollContainer>
        <NoScroll>
          {layers.map(({ type, units, activation }, index) => (
            <Flex key={index}>
              <Row>
                <MobileLabel tooltip="Existen varios tipos de capa dependiendo del problema de aprendizaje automático.">
                  Tipo de la Capa {index + 1}
                </MobileLabel>
                <Select
                  name={`type${index}`}
                  defaultValue={type.value}
                  options={mlFunctions.layers}
                  onBlur={onChange}
                  data-key="layers"
                  data-index={index}
                  data-subkey="type"
                />
              </Row>
              <Row>
                <MobileLabel tooltip="Cada una de las unidades básicas que conforman la red neuronal.">
                  Neuronas de la Capa {index + 1}
                </MobileLabel>
                <Input
                  type="number"
                  name={`units${index}`}
                  defaultValue={units.value}
                  min={1}
                  validation={units.validation}
                  onBlur={onChange}
                  data-key="layers"
                  data-index={index}
                  data-subkey="units"
                />
              </Row>
              <Row>
                <MobileLabel tooltip="Esta función determina las salidas de cada neurona en la red neuronal.">
                  Función de Activación de la Capa {index + 1}
                </MobileLabel>
                <InputWithIcon>
                  <Select
                    name={`activation${index}`}
                    defaultValue={activation.value}
                    options={mlFunctions.activation}
                    onBlur={onChange}
                    data-key="layers"
                    data-index={index}
                    data-subkey="activation"
                  />
                  {layers.length <= 3 ? null : (
                    <Icon
                      icon="minus-circle"
                      color="#555555"
                      onClick={removeInput}
                      data-key="layers"
                      data-index={index}
                    />
                  )}
                </InputWithIcon>
              </Row>
            </Flex>
          ))}
        </NoScroll>
      </NoScrollContainer>

      <Row onClick={addInput} data-key="layers">
        <AddInput icon="plus-circle" color="#555555" />
        <Text>Agregar Capa</Text>
      </Row>
    </Column>
  );
};

Step3.propTypes = {};

Step3.defaultProps = {};

export default Step3;
