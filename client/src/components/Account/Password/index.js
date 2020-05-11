import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { checkValidity } from "../../../utils/utils";
import { updatePasswordRequest } from "../../../store/admin/actions";
import { selectAdmin } from "../../../store/admin/selectors";

import Label from "../../Common/CustomLabel";
import Input from "../../Common/CustomInput";

import formModel from "./model";

import { Container, Flex, Information, Header, Title, Body } from "./styles";
import { Footer, Button, Labels, Inputs } from "./styles";

const Form = () => {
  const dispatch = useDispatch();

  const [changed, setChanged] = useState(false);
  const [state, setState] = useState({
    passwordForm: formModel,
    isValid: false,
  });

  const { passwordForm, isValid } = state;
  const { password, password2 } = passwordForm;

  const isFormValid = useCallback((passwordForm) => {
    let isValid = true;

    for (const key in passwordForm) {
      const input = passwordForm[key];
      input.validation = checkValidity(input.value, input.validators);
      isValid = input.validation[0] && isValid;
    }

    return isValid;
  }, []);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      const newForm = { ...passwordForm };
      const newInput = { ...newForm[name] };

      newInput.value = value;
      newForm[name] = newInput;

      setState({ passwordForm: newForm, isValid: isFormValid(newForm) });
      setChanged(true);
    },
    [passwordForm]
  );

  const updatePassword = useCallback(() => {
    if (password.value === password2.value || !isFormValid(passwordForm))
      return;

    const formData = {
      password: password.value,
      password2: password2.value,
    };

    dispatch(updatePasswordRequest(formData));
    setChanged(false);
  }, [passwordForm]);

  return (
    <Container>
      <Information>
        <Header color="#343434">
          <Title>Cambio de Contraseña</Title>
        </Header>
        <Body>
          <Flex>
            <Labels>
              <Label tooltip="¿Cuál es tu contraseña actual?">Actual</Label>
            </Labels>
            <Inputs>
              <Input
                type="password"
                name="password"
                defaultValue={password.value}
                validation={password.validation}
                onBlur={onChange}
              />
            </Inputs>
          </Flex>
          <Flex>
            <Labels>
              <Label tooltip="¿Cuál será tu nueva contraseña?">Nueva</Label>
            </Labels>
            <Inputs>
              <Input
                type="password"
                name="password2"
                defaultValue={password2.value}
                validation={password2.validation}
                onBlur={onChange}
              />
            </Inputs>
          </Flex>
        </Body>
        <Footer>
          {changed ? (
            <Button
              onClick={updatePassword}
              color="#fbfbfb"
              backgroundColor="#343434"
              grayed={!isValid}
            >
              Guardar
            </Button>
          ) : null}
        </Footer>
      </Information>
    </Container>
  );
};

export default Form;
