import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import { checkValidity } from "../../../../utils/utils";

const Container = styled.div`
  grid-column: ${(props) => props.columns};
`;

const Label = styled.label`
  color: ${(props) => (props.valid ? "#8d99a6" : "#ff5858")};
`;

const Input = styled.input`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const TimeInput = ({
  autoFocus,
  idx,
  bold,
  columns,
  doc,
  field_name,
  label,
  onChange,
  read_only,
  required,
  set_only_once,
  ...props
}) => {
  const inputRef = useRef();
  const [state, setState] = useState("");
  const [valid, setValid] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const value = moment(doc[field_name]).format("hh:mm");
    const defaultValue = props.default
      ? moment(new Date()).format("hh:mm")
      : "";

    if (set_only_once && value !== defaultValue && !locked) {
      setLocked(true);
    }

    if (!locked) {
      setState(value);
    }
  }, [doc[field_name]]);

  const onLocalChange = (e) => {
    setState(e.target.value);
  };

  const onBlur = (e) => {
    const [hours, minutes] = state.split(":");
    const date = new Date().setHours(hours, minutes);
    onChange(idx, field_name, new Date(date));
  };

  return (
    <Container columns={columns}>
      <Label htmlFor={field_name} valid={valid}>
        {label}
      </Label>
      <Input
        type="time"
        bold={bold}
        name={field_name}
        disabled={read_only || locked}
        required={required}
        ref={inputRef}
        value={state}
        onBlur={onBlur}
        onChange={onLocalChange}
        autoComplete="off"
        autoFocus={autoFocus}
      />
    </Container>
  );
};

export default TimeInput;
