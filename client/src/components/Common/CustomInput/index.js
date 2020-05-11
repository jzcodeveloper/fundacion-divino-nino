import React, { useState, useEffect, useRef, useCallback } from "react";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import { usePrevious } from "../../../hooks/customHooks";

import { Container, Tooltip, Triangle, Icon, ShowIcon } from "./styles";
import { Password, TextInput, TextArea, Messages, Text } from "./styles";

const FormInput = ({ type, defaultValue, validation, autoFocus, ...props }) => {
  const [isValid, messages] = validation;
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const intervalRef = useRef(null);
  const inputRef = useRef(null);
  const prevValidation = usePrevious(validation);

  useEffect(() => {
    if (autoFocus) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (prevValidation && !prevValidation[0] && validation[0])
      setShowError(false);

    if (!validation[0]) {
      setShowError(true);

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setTimeout(() => setShowError(false), 2000);
    }
  }, [validation]);

  const togglePassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const validateNumber = useCallback((e) => {
    e.target.value = Math.abs(e.target.value);
    if (e.target.value > props.max) e.target.value = props.max;
    if (e.target.value < props.min) e.target.value = props.min;
  }, []);

  return (
    <Container>
      {type === "textarea" ? (
        <TextArea
          defaultValue={defaultValue}
          rows={10}
          ref={inputRef}
          {...props}
        />
      ) : type === "password" ? (
        <Password>
          <TextInput
            type={showPassword ? "text" : "password"}
            defaultValue={defaultValue}
            ref={inputRef}
            {...props}
          />
          <ShowIcon icon="eye" onClick={togglePassword} fixedWidth />
        </Password>
      ) : type === "number" ? (
        <TextInput
          type={type}
          defaultValue={defaultValue}
          onInput={validateNumber}
          ref={inputRef}
          {...props}
        />
      ) : (
        <TextInput
          type={type}
          defaultValue={defaultValue}
          ref={inputRef}
          {...props}
        />
      )}

      <CSSTransition
        in={showError}
        timeout={{ enter: 0, exit: 300 }}
        classNames="fade"
        unmountOnExit
      >
        <Tooltip>
          <Triangle />
          <Icon icon="exclamation-circle" color="#fbfbfb" />
          <Messages>
            {messages.length
              ? messages.map((message) => <Text key={message}>{message}</Text>)
              : null}
          </Messages>
        </Tooltip>
      </CSSTransition>
    </Container>
  );
};

FormInput.defaultProps = {
  validation: [true, ""],
  type: "text",
  min: 0,
  max: 1000000,
  step: 1,
  autoComplete: "off",
  autoCorrect: "off",
  spellCheck: false,
};

export default FormInput;
