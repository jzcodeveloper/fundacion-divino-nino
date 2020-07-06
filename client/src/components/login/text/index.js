import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Input = styled.input`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  height: 40px;
  margin-bottom: 10px;

  :invalid {
    border-color: #d1d8dd;
    box-shadow: unset;
  }

  :focus {
    box-shadow: 0 0px 0px 3px rgba(0, 0, 0, 0.075), 0 0 6px #d1d8dd;
  }
`;

const TextInput = ({
  autoFocus,
  bold,
  doc,
  name,
  onChange,
  placeholder,
  required,
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
    onChange(name, state);
  };

  return (
    <Container>
      <Input
        type="text"
        bold={bold}
        name={name}
        required={required}
        ref={inputRef}
        value={state}
        onChange={onLocalChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
    </Container>
  );
};

export default TextInput;
