import React from "react";
import PropTypes from "prop-types";

import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";

import { Column } from "./styles";

const Step2 = ({ value, validation, onChange }) => {
  return (
    <Column>
      <Label tooltip="Indica cuántas entradas tendrá el modelo.">
        Forma de Entrada
      </Label>
      <Input
        type="text"
        name="inputShape"
        defaultValue={value}
        validation={validation}
        onBlur={onChange}
        data-key="inputShape"
        autoFocus
      />
    </Column>
  );
};

Step2.propTypes = {};

Step2.defaultProps = {};

export default Step2;
