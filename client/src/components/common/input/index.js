import React from "react";
import styled from "styled-components";

import TextInput from "../inputs/text";
import CheckInput from "../inputs/check";
import NumberInput from "../inputs/number";
import SelectInput from "../inputs/select";
import LinkInput from "../inputs/link";
import TableLinkInput from "../inputs/table_link";
import TableInput from "../inputs/table";
import DateInput from "../inputs/date";
import TimeInput from "../inputs/time";
import TextAreaInput from "../inputs/textarea";
import PasswordInput from "../inputs/password";

const Input = ({ field_type, ...props }) => {
  return (
    <>
      {field_type === "Data" ? (
        <TextInput {...props} />
      ) : field_type === "Check" ? (
        <CheckInput {...props} />
      ) : field_type === "Number" ? (
        <NumberInput {...props} />
      ) : field_type === "Select" ? (
        <SelectInput {...props} />
      ) : field_type === "Link" ? (
        <LinkInput {...props} />
      ) : field_type === "Table Link" ? (
        <TableLinkInput {...props} />
      ) : field_type === "Table" ? (
        <TableInput {...props} />
      ) : field_type === "Date" ? (
        <DateInput {...props} />
      ) : field_type === "Time" ? (
        <TimeInput {...props} />
      ) : field_type === "Small Text" ? (
        <TextAreaInput {...props} />
      ) : field_type === "Password" ? (
        <PasswordInput {...props} />
      ) : null}
    </>
  );
};

export default Input;
