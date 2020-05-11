import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { checkValidity } from "../../../utils/utils";
import { updateAdminRequest } from "../../../store/admin/actions";
import { selectAdmin } from "../../../store/admin/selectors";

import Label from "../../Common/CustomLabel";
import Input from "../../Common/CustomInput";

import formModel from "./model";

import { Container, Flex, Information, Header, Title, Body } from "./styles";
import { Footer, Button, Labels, Inputs } from "./styles";

const Form = () => {
  const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);

  const [changed, setChanged] = useState(false);
  const [state, setState] = useState({
    dataForm: formModel(admin),
    isValid: false,
  });

  const { dataForm, isValid } = state;
  const { degree, username, email } = dataForm;

  const isFormValid = useCallback((dataForm) => {
    let isValid = true;

    for (const key in dataForm) {
      const input = dataForm[key];
      input.validation = checkValidity(input.value, input.validators);
      isValid = input.validation[0] && isValid;
    }

    return isValid;
  }, []);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      const newForm = { ...dataForm };
      const newInput = { ...newForm[name] };

      newInput.value = value;
      newForm[name] = newInput;

      setState({ dataForm: newForm, isValid: isFormValid(newForm) });
      setChanged(true);
    },
    [dataForm]
  );

  const updateAdmin = useCallback(() => {
    if (!isFormValid(dataForm)) return;

    const formData = {
      degree: degree.value,
      username: username.value,
      email: email.value,
    };

    dispatch(updateAdminRequest(formData));
    setChanged(false);
  }, [dataForm]);

  return (
    <Container>
      <Information>
        <Header color="#343434">
          <Title>Datos Personales</Title>
        </Header>
        <Body>
          <Flex>
            <Labels>
              <Label tooltip="¿Cuál es tu profesión?">Profesión</Label>
            </Labels>
            <Inputs>
              <Input
                type="text"
                name="degree"
                defaultValue={degree.value}
                validation={degree.validation}
                onBlur={onChange}
              />
            </Inputs>
          </Flex>
          <Flex>
            <Labels>
              <Label tooltip="Nombre de usuario preferido.">Usuario</Label>
            </Labels>
            <Inputs>
              <Input
                type="text"
                name="username"
                defaultValue={username.value}
                validation={username.validation}
                onBlur={onChange}
              />
            </Inputs>
          </Flex>
          <Flex>
            <Labels>
              <Label tooltip="Coloca el email que usas con más frecuencia.">
                Email
              </Label>
            </Labels>
            <Inputs>
              <Input
                type="text"
                name="email"
                defaultValue={email.value}
                validation={email.validation}
                onBlur={onChange}
              />
            </Inputs>
          </Flex>
        </Body>
        <Footer>
          {changed ? (
            <Button
              onClick={updateAdmin}
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
