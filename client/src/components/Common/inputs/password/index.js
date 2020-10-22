import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkValidity } from "../../../../utils/utils";

const Container = styled.div`
  grid-column: ${(props) => props.columns};
  position: relative;
`;

const Label = styled.label`
  color: ${(props) => (props.valid ? "#8d99a6" : "#ff5858")};
`;

const Input = styled.input`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  padding-right: 35px;
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  top: calc(50% + 3px);
  right: 10px;
`;

const PasswordInput = ({
  autoFocus,
  idx,
  bold,
  columns,
  doc,
  field_name,
  label,
  onChange,
  placeholder,
  read_only,
  required,
  set_only_once,
  ...props
}) => {
  const inputRef = useRef();
  const [state, setState] = useState("");
  const [valid, setValid] = useState(false);
  const [show, setShow] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
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
    const value = e.target.value;
    setState(value);
  };

  const onBlur = (e) => {
    onChange(idx, field_name, state);
  };

  const onClick = () => {
    setShow(!show);
  };

  return (
    <Container columns={columns}>
      <Label htmlFor={field_name} valid={valid}>
        {label}
      </Label>
      <Input
        type={show ? "text" : "password"}
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
      <Icon icon={show ? "eye" : "eye-slash"} onClick={onClick} />
    </Container>
  );
};

export default PasswordInput;
