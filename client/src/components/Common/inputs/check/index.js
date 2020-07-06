import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-column: ${(props) => props.columns};
  position: relative;
`;

const Label = styled.label`
  color: ${(props) => (props.valid ? "#8d99a6" : "#ff5858")};
`;

export const Input = styled.input`
  opacity: 0;
`;

export const Check = styled.span`
  position: absolute;
  top: calc(50%);
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};

  ::after {
    content: "";
    position: absolute;
    display: none;

    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }

  ${Input}:checked ~ & {
    background-color: #2196f3;
  }

  ${Input}:checked ~ &::after {
    display: block;
  }
`;

const CheckInput = ({
  autoFocus,
  idx,
  bold,
  columns,
  doc,
  field_name,
  label,
  onChange,
  precision,
  required,
  read_only,
  set_only_once,
  ...props
}) => {
  const [state, setState] = useState(false);
  const [valid, setValid] = useState(true);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const value = doc[field_name];
    const defaultValue = props.default === "true" ? true : false;

    // Handle the set_only_once property
    if (set_only_once && value !== defaultValue && !locked) {
      setLocked(true);
    }

    if (!locked) {
      setState(value);
    }
  }, [doc[field_name]]);

  const onLocalChange = () => {
    onChange(idx, field_name, !state);
  };

  return (
    <Container columns={columns}>
      <Label htmlFor={field_name} valid={valid}>
        {label}
      </Label>
      <Input
        type="radio"
        name={idx ? idx + field_name : field_name}
        checked={state}
        disabled={read_only || locked}
      />
      <Check onClick={onLocalChange} disabled={read_only || locked} />
    </Container>
  );
};

export default CheckInput;
