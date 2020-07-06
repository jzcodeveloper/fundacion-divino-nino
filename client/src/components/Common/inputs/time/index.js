import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { time } from "../../../../utils/utils";

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
  required,
  read_only,
  set_only_once,
  ...props
}) => {
  const inputRef = useRef();
  const [state, setState] = useState("");
  const [valid, setValid] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const value = time(doc[field_name], "hh:mm");
    const defaultValue = props.default ? time(new Date(), "hh:mm") : "";

    if (set_only_once && value !== defaultValue && !locked) {
      setLocked(true);
    }

    if (!locked) {
      setState(value);
    }
  }, [doc[field_name]]);

  const onLocalChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    const date = new Date().setHours(hours, minutes);
    const value = time(date, "hh:mm");
    setState(value);
  };

  const onBlur = (e) => {
    const [hours, minutes] = state.split(":");
    const date = new Date().setHours(hours, minutes);
    onChange(idx, field_name, date);
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
