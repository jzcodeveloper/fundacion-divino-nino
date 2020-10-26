import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
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

const NumberInput = ({
  autoFocus,
  idx,
  bold,
  columns,
  doc,
  field_name,
  label,
  onChange,
  precision,
  read_only,
  required,
  set_only_once,
  ...props
}) => {
  const inputRef = useRef();
  const [state, setState] = useState(0);
  const [valid, setValid] = useState(true);
  const [locked, setLocked] = useState(false);
  const [validators] = useState({ ...props });

  useEffect(() => {
    const value = doc[field_name];
    const defaultValue = props.default ? Number(props.default) : 0;

    // Handle the set_only_once property
    if (set_only_once && value !== defaultValue && !locked) {
      setLocked(true);
    }

    if (!locked) {
      setState(value);
    }
  }, [doc[field_name]]);

  useEffect(() => {
    const [isValid, errorMessages] = checkValidity(state, validators);

    if (isValid !== valid) {
      inputRef.current.setCustomValidity(errorMessages.join("\n"));
      setValid(isValid);
    }
  }, [state]);

  const onLocalChange = (e) => {
    const value = e.target.value ? Number(e.target.value) : 0;
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
        type="number"
        bold={bold}
        name={field_name}
        disabled={read_only || locked}
        required={required}
        ref={inputRef}
        value={state}
        onChange={onLocalChange}
        onBlur={onBlur}
        autoComplete="off"
        autoFocus={autoFocus}
      />
    </Container>
  );
};

export default NumberInput;
