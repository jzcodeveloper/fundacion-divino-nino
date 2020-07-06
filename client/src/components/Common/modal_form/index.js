import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "../../../store/axios";
import { date } from "../../../utils/utils";

import {
  selectDoctype,
  selectDoctypeQuickEntryFields,
} from "../../../store/doctypes/selectors";

import Button from "../button";
import Input from "../input";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 50;
  overflow-y: auto;
`;

const Modal = styled.div`
  padding: 100px 0;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  background-color: #fbfbfb;
  border-radius: 4px;
`;

const Heading = styled.h2``;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  border-bottom: 1px solid #d1d8dd;
`;

const MainSection = styled.div``;

const Form = styled.form`
  padding: 30px;
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px 30px;

  div {
    grid-column: 1/2;
  }
`;

const ModalForm = ({ label, model, close, onSubmit }) => {
  const formRef = useRef();
  const doctypeData = useSelector(selectDoctype(model));
  const doctypeQuickEntryFields = useSelector(
    selectDoctypeQuickEntryFields(model)
  );

  const [state, setState] = useState({});

  useLayoutEffect(() => {
    const body = document.querySelector("body");
    body.style.height = "100vh";
    body.style.overflowY = "hidden";
    body.style.paddingRight = "17px";

    return () => {
      body.style.height = "initial";
      body.style.overflowY = "initial";
      body.style.paddingRight = "initial";
    };
  }, []);

  useEffect(() => {
    const stateObject = doctypeQuickEntryFields.reduce((acc, val) => {
      const { field_name, field_type } = val;

      if (field_type === "Number") {
        acc[field_name] = val.default ? Number(val.default) : 0;
      } else if (field_type === "Check") {
        acc[field_name] = val.default === "true" ? true : false;
      } else if (field_type === "Link" || field_type === "Table Link") {
        acc[field_name] = {};
      } else if (field_type === "Date") {
        acc[field_name] = val.default ? date(new Date(), "yyyy-mm-dd") : "";
      } else if (field_type === "Time") {
        acc[field_name] = val.default ? new Date() : "";
      } else if (field_type === "Table") {
        acc[field_name] = [];
      } else {
        acc[field_name] = val.default;
      }

      return acc;
    }, {});

    setState(stateObject);
  }, []);

  const closeModal = (e) => {
    if (e.target.dataset.modal) close();
  };

  const onChange = (index, name, value) => {
    setState({ ...state, [name]: value });
  };

  const submitDocument = async (e) => {
    // Prepare query
    const valid = formRef.current.reportValidity();
    if (!valid) return;

    const query = { model };
    const options = { params: query };

    try {
      const { data } = await axios.post(`/documents`, [state], options);
      onSubmit(data.data[0]);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Overlay>
      <Modal onClick={closeModal} data-modal={true}>
        {Object.keys(state).length > 0 && (
          <Container>
            <TopSection>
              <Heading>Nuevo {label}</Heading>
              <Button
                bgColor="#4343e2"
                color="#ffffff"
                onClick={submitDocument}
              >
                Crear
              </Button>
            </TopSection>

            <MainSection>
              <Form ref={formRef}>
                <Column>
                  {doctypeQuickEntryFields.map((field, i) => (
                    <Input
                      key={field.field_name}
                      doc={state}
                      onChange={onChange}
                      autoFocus={i === 0}
                      {...field}
                    />
                  ))}
                </Column>
              </Form>
            </MainSection>
          </Container>
        )}
      </Modal>
    </Overlay>
  );
};

export default ModalForm;
