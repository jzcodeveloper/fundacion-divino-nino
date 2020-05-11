import React from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";

import { Column } from "./styles";

const Step1 = ({ value, validation, onChange }) => {
  return (
    <Column>
      <Label
        tooltip="El título se mostrará en el listado de tareas, de ser posible, debe
          ser breve y preciso."
      >
        Título de la Tarea
      </Label>
      <Input
        type="text"
        name="title"
        defaultValue={value}
        validation={validation}
        onBlur={onChange}
        data-key="title"
        autoFocus
      />
    </Column>
  );
};

Step1.propTypes = {};

Step1.defaultProps = {};

export default Step1;
