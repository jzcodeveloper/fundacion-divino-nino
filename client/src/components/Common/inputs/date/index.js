import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
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

const DateInput = ({
  autoFocus,
  idx,
  bold,
  columns,
  doc,
  field_name,
  label,
  onChange,
  read_only,
  required,
  set_only_once,
  ...props
}) => {
  const inputRef = useRef();
  const [state, setState] = useState("");
  const [valid, setValid] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const value = moment(doc[field_name]).format("yyyy-MM-DD");
    const defaultValue = props.default
      ? moment(new Date()).format("yyyy-MM-DD")
      : "";

    if (set_only_once && value !== defaultValue && !locked) {
      setLocked(true);
    }

    if (!locked) {
      setState(value);
    }
  }, [doc[field_name]]);

  const onLocalChange = (e) => {
    setState(e.target.value);
  };

  const onBlur = () => {
    const [year, month, day] = state.split("-");
    const date = new Date().setFullYear(year, month - 1, day);
    onChange(idx, field_name, new Date(date));
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
