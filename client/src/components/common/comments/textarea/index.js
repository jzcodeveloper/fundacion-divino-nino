import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Input = styled.textarea`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  height: auto;
`;

const TextInput = ({
  autoFocus,
  bold,
  doc,
  disabled,
  name,
  onChange,
  onBlur,
  placeholder,
  ref,
  required,
  rows,
  ...props
}) => {
  const inputRef = useRef();
  const [state, setState] = useState("");
  const [valid, setValid] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const value = doc[name];
    setState(value);
  }, [doc[name]]);

  useEffect(() => {
    if (required) {
      if (state) {
        inputRef.current.setCustomValidity("");
        if (!valid) setValid(true);
      } else {
        inputRef.current.setCustomValidity("Este campo es requerido");
        if (valid) setValid(false);
      }
    } else {
      if (!valid) setValid(true);
    }
  }, [state]);

  /* useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [disabled]); */

  const onLocalChange = (e) => {
    const value = e.target.value;
    setState(value);
  };

  const onLocalBlur = (e) => {
    if (onBlur) onBlur();
    onChange(name, state);
  };

  return (
    <Container>
      <Input
        bold={bold}
        disabled={disabled}
        name={name}
        required={required}
        ref={inputRef}
        value={state}
        onChange={onLocalChange}
        onBlur={onLocalBlur}
        autoFocus={autoFocus}
        placeholder={placeholder}
        rows={rows}
      />
    </Container>
  );
};

export default TextInput;
