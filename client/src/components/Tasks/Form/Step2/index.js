import React from "react";
import PropTypes from "prop-types";

import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";

import { Column } from "./styles";

const Step2 = ({ value, validation, onChange }) => {
  return (
    <Column>
      <Label tooltip="La descripción se utilizará para ayudar a los encuestados a entender de qué se trata la tarea, debe ser clara y precisa.">
        Descripción de la Tarea
      </Label>
      <Input
        type="textarea"
        name="description"
        defaultValue={value}
        validation={validation}
        onBlur={onChange}
        data-key="description"
        autoFocus
      />
    </Column>
  );
};

Step2.propTypes = {};

Step2.defaultProps = {};

export default Step2;
