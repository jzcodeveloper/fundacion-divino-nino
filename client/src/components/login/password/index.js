import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  height: 40px;
  padding-right: 35px;
  margin-bottom: 10px;

  :invalid {
    border-color: #d1d8dd;
    box-shadow: unset;
  }

  :focus {
    box-shadow: 0 0px 0px 3px rgba(0, 0, 0, 0.075), 0 0 6px #d1d8dd;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 22px;
  right: 10px;
`;

const PasswordInput = ({
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
  const [show, setShow] = useState(false);
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

  const onClick = () => {
    setShow(!show);
  };

  return (
    <Container>
      <Input
        type={show ? "text" : "password"}
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
      <Icon icon={show ? "eye" : "eye-slash"} onClick={onClick} />
    </Container>
  );
};

export default PasswordInput;
