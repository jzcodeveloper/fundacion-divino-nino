import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { date } from "../../../../utils/utils";

const Container = styled.div`
  grid-column: ${(props) => props.columns};
`;

const Label = styled.label`
  color: ${(props) => (props.valid ? "#8d99a6" : "#ff5858")};
`;

const Input = styled.input`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const DateInput = ({
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
    const value = date(doc[field_name], "yyyy-mm-dd");
    const defaultValue = props.default ? date(new Date(), "yyyy-mm-dd") : "";

    if (set_only_once && value !== defaultValue && !locked) {
      setLocked(true);
    }

    if (!locked) {
      setState(value);
    }
  }, [doc[field_name]]);

  const onLocalChange = (e) => {
    const value = date(e.target.value, "yyyy-mm-dd");
    setState(value);
  };

  const onBlur = (e) => {
    onChange(idx, field_name, state);
  };

  return (
    <Container columns={columns}>
      <Label htmlFor={field_name} valid={valid}>
        {label}
      </Label>
      <Input
        type="date"
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

export default DateInput;
