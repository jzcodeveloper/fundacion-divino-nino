import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { checkValidity } from "../../../../utils/utils";

const Container = styled.div`
  grid-column: ${(props) => props.columns};
`;

const Label = styled.label`
  color: ${(props) => (props.valid ? "#8d99a6" : "#ff5858")};
`;

const Select = styled.select`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const Option = styled.option``;

const SelectInput = ({
  autoFocus,
  idx,
  bold,
  columns,
  doc,
  field_name,
  label,
  onChange,
  options,
  placeholder,
  read_only,
  required,
  set_only_once,
  ...props
}) => {
  const inputRef = useRef();
  const [state, setState] = useState("");
  const [valid, setValid] = useState(true);
  const [locked, setLocked] = useState(false);
  const [validators] = useState({ required, ...props });

  useEffect(() => {
    const value = doc[field_name];
    const defaultValue = props.default;

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
    setState(e.target.value);
  };

  const onBlur = (e) => {
    onChange(idx, field_name, state);
  };

  return (
    <Container columns={columns}>
      <Label htmlFor={field_name} valid={valid}>
        {label}
      </Label>
      <Select
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
        placeholder={placeholder}
      >
        <Option></Option>
        {options.split("\n").map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Select>
    </Container>
  );
};

export default SelectInput;
