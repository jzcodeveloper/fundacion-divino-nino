import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { checkValidity } from "../../../../utils/utils";
import { loginAdminRequest } from "../../../../store/admin/actions";

import formModel from "./model";
import Label from "../../../Common/CustomLabel";
import Input from "../../../Common/CustomInput";

import { Container, Information, Header, Title, Body, Inputs } from "./styles";
import { Footer, Button } from "./styles";

const Form = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({ adminForm: formModel, isValid: false });

  const { adminForm, isValid } = state;
  const { username, email, password } = adminForm;

  useEffect(() => {
    setState({ ...state, isValid: isFormValid(adminForm) });
  }, []);

  const isFormValid = useCallback((adminForm) => {
    let isValid = true;

    for (const key in adminForm) {
      const input = adminForm[key];
      input.validation = checkValidity(input.value, input.validators);
      isValid = input.validation[0] && isValid;
    }

    return isValid;
  }, []);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      const newForm = { ...adminForm };
      const newInput = { ...newForm[name] };

      newInput.value = value;
      newForm[name] = newInput;

      setState({ adminForm: newForm, isValid: isFormValid(newForm) });
    },
    [adminForm]
  );

  const loginAdmin = useCallback(() => {
    if (!isFormValid(adminForm)) return;

    const formData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    dispatch(loginAdminRequest(formData));
  }, [adminForm]);

  return (
    <Container>
      <Information>
        <Header color="#343434">
          <Title>Iniciar Sesión</Title>
        </Header>
        <Body>
          <Inputs>
            <Label tooltip="Tu nombre de usuario te identificará dentro del sistema.">
              Nombre de Usuario
            </Label>
            <Input
              type="text"
              name="username"
              defaultValue={username.value}
              validation={username.validation}
              onBlur={onChange}
            />
          </Inputs>

          <Inputs>
            <Label tooltip="Tu correo electrónico debe ser el que usas con más frecuencia.">
              Correo Electrónico
            </Label>
            <Input
              type="text"
              name="email"
              defaultValue={email.value}
              validation={email.validation}
              onBlur={onChange}
            />
          </Inputs>

          <Inputs>
            <Label tooltip="Tu contraseña debe ser segura y fácil de recordar.">
              Contraseña
            </Label>
            <Input
              type="password"
              name="password"
              defaultValue={password.value}
              validation={password.validation}
              onBlur={onChange}
            />
          </Inputs>
        </Body>
        <Footer>
          <Button
            onClick={loginAdmin}
            color="#fbfbfb"
            backgroundColor="#343434"
            grayed={!isValid}
          >
            Enviar
          </Button>
        </Footer>
      </Information>
    </Container>
  );
};

export default Form;
