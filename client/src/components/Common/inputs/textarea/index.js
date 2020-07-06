import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-column: ${(props) => props.columns};
`;

const Label = styled.label`
  color: ${(props) => (props.valid ? "#8d99a6" : "#ff5858")};
`;

const Input = styled.input`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const TextAreaInput = ({
  autoFocus,
  idx,
  bold,
  columns,
  doc,
  field_name,
  label,
  onChange,
  placeholder,
  required,
  read_only,
  set_only_once,
  ...props
}) => {
  const inputRef = useRef();
  const [state, setState] = useState("");
  const [valid, setValid] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [locked, setLocked] = useState(false);

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
    if (required) {
      if (state) {
        inputRef.current.setCustomValidity("");
        setValid(true);
      } else {
        inputRef.current.setCustomValidity("Este campo es requerido");
        setValid(false);
      }
    } else {
      setValid(true);
    }
  }, [state]);

  const onLocalChange = (e) => {
    const value = e.target.value;
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
      />
    </Container>
  );
};

export default TextAreaInput;
