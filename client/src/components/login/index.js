import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { selectLoading } from "../../store/user/selectors";
import { loginUserRequest } from "../../store/user/actions";

import TextInput from "./text";
import PasswordInput from "./password";
import Button from "./button";

const Container = styled.div`
  margin: 100px auto;
  max-width: 400px;
  background-color: #fbfbfb;
  border-radius: 4px;
  border: 1px solid #d1d8dd;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #d1d8dd;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 0.75em;
  path {
    color: ${(props) => props.color || "initial"};
  }
`;

const Span = styled.span`
  font-size: 0.9em;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  padding: 15px;
`;

const Auth = () => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: "Administrador",
    password: "admin",
  });

  const onChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const onSubmit = () => {
    const valid = formRef.current.reportValidity();
    if (!valid) return;

    dispatch(loginUserRequest(state));
  };

  return (
    <Container>
      <TopSection>
        <Icon icon="circle" color="#4343e2" />
        <Span>Iniciar Sesión</Span>
      </TopSection>

      <Form ref={formRef}>
        <TextInput
          name="username"
          placeholder="Usuario"
          doc={state}
          onChange={onChange}
          required
        />
        <PasswordInput
          name="password"
          placeholder="Contraseña"
          doc={state}
          onChange={onChange}
          required
        />
        <Button bgColor="#4343e2" color="#ffffff" onClick={onSubmit}>
          Ingresar
        </Button>
      </Form>
    </Container>
  );
};

export default Auth;
