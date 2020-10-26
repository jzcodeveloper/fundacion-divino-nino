import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { checkValidity } from "../../../../utils/utils";

const Container = styled.div`
  grid-column: ${(props) => props.columns};
  position: relative;
`;

const Label = styled.label`
  color: ${(props) => (props.valid ? "#8d99a6" : "#ff5858")};
`;

export const Input = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
`;

export const Check = styled.span`
  position: absolute;
  top: calc(50% - 7px);
  left: 0;
  height: 12px;
  width: 12px;
  background-color: transparent;
  border: 1px solid #d1d8dd;
  border-radius: 2px;
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  transition: all 0.05s;

  ::after {
    content: "";
    position: absolute;
    display: none;

    left: 4px;
    top: 2px;
    width: 2px;
    height: 5px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  ${Input}:checked ~ & {
    background-color: #0057a6;
    border: none;
  }

  ${Input}:checked ~ &::after {
    display: block;
  }
`;

const CheckInput = ({
  autoFocus,
  idx,
  columns,
  doc,
  field_name,
  label,
  onChange,
  read_only,
  set_only_once,
  ...props
}) => {
  const [state, setState] = useState(false);
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
      <Label htmlFor={field_name} valid={true}>
        {label}
      </Label>
      <Input
        type="radio"
        name={idx ? idx + field_name : field_name}
        checked={state}
        onChange={null}
        disabled={read_only || locked}
      />
      <Check onClick={onLocalChange} disabled={read_only || locked} />
    </Container>
  );
};

export default CheckInput;
