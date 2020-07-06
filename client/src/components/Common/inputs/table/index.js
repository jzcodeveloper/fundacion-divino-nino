import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { date } from "../../../../utils/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  fetchTableDocumentsRequest,
  updateTableDocumentData,
} from "../../../../store/tables/actions";

import { selectTableDocument } from "../../../../store/tables/selectors";

import {
  selectDoctype,
  selectDoctypeFields,
  selectDoctypeListFields,
  selectDoctypeDependentFields,
} from "../../../../store/doctypes/selectors";

import Button from "../../button";
import Input from "../../input";

const Container = styled.div`
  grid-column: ${(props) => props.columns};
`;

const Label = styled.label`
  /* color: ${(props) => (props.valid ? "#8d99a6" : "#ff5858")}; */
  color: #8d99a6;
`;

const Table = styled.div`
  border-top: 1px solid #d1d8dd;
  border-left: 1px solid #d1d8dd;
  border-right: 1px solid #d1d8dd;
  border-radius: 4px;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 0.75em;
  border-bottom: 1px solid #d1d8dd;

  :first-child {
    background-color: #f7fafc;
  }

  :hover {
    background-color: #f7fafc;
  }
`;

const TableDescription = `
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  border-left: 1px solid #d1d8dd;

  :first-child {
    flex: 0;
    min-width: 50px;
    border-left: none;
  }
`;

const TableHeader = styled.div`
  ${TableDescription}
  color: #8d99a6;
  padding: 4px 10px;
`;

const TableColumn = styled.div`
  ${TableDescription}
  color: #6c7680;

  :first-child {
    padding: 4px 10px;
  }
`;

const Inputs = styled.div`
  height: 100%;
  width: 100%;

  div:first-child {
    height: 100%;
    margin-bottom: 0;
  }

  label {
    display: none;
  }

  input {
    height: 100%;
    border-radius: 0;
    border: none;
  }

  input + div {
    top: 38px;
    border-left: none;
    border-right: none;
  }
`;

const Buttons = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid #d1d8dd;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.1em;
  cursor: pointer;

  path {
    color: ${(props) => (props.selected ? "inherit" : "#d1d8dd")};
  }
`;

const TableInput = ({
  idx,
  columns,
  doc: parentDoc,
  field_name,
  label,
  onChange,
  options,
  parent_model,
  parent_name,
  set_only_once,
}) => {
  const dispatch = useDispatch();
  const doctypeFields = useSelector(selectDoctypeFields(options));
  const doctypeListFields = useSelector(selectDoctypeListFields(options));
  const doctypeDependentFields = useSelector(
    selectDoctypeDependentFields(options)
  );
  const documentData = useSelector(
    selectTableDocument({ model: options, parent_model, parent_name })
  );

  const [state, setState] = useState(documentData);
  const [firstRender, setFirstRender] = useState(true);
  const [locked, setLocked] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  const selectedItemsKeys = Object.keys(selectedItems);
  const areAllSelected =
    selectedItemsKeys.length > 0 && selectedItemsKeys.length === state.length;

  useEffect(() => {
    // Populate every Link field
    const populate = doctypeFields
      .reduce((acc, val) => {
        if (val.field_type === "Link" || val.field_type === "Table Link")
          acc.push(val.field_name);
        return acc;
      }, [])
      .join(",");

    const query = { model: options, parent_model, parent_name, populate };
    dispatch(fetchTableDocumentsRequest(query));

    /* return () => dispatch(updateTableDocumentData()); */
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    if (set_only_once) {
      if (documentData.length > 0) {
        setLocked(true);
      }
    }

    if (!locked) {
      setState(documentData);
    }
  }, [documentData]);

  useEffect(() => {
    onChange(idx, field_name, state);
  }, [state]);

  const onLocalChange = (index, name, value) => {
    const newState = [...state];

    // Works for date, password, text, textarea and link inputs
    newState[index][name] = value;
    // Still need to handle check, select inputs

    newState.forEach((doc) => {
      doctypeDependentFields.forEach((field) => {
        const { field_name, field_type, depends_on, fetch_from } = field;
        const parent = parentDoc;

        if (doc[depends_on]) {
          const [key, subkey] = fetch_from.split(".");

          if (doc[key][subkey] === undefined) {
            if (field_type === "Number") doc[field_name] = 0;
            if (field_type === "Data") doc[field_name] = "";
          } else {
            doc[field_name] = doc[key][subkey];
          }
        } else {
          try {
            doc[field_name] = eval(depends_on.split(":")[1]);
          } catch (error) {
            if (field_type === "Number") doc[field_name] = 0;
            if (field_type === "Data") doc[field_name] = "";
          }
        }
      });
    });

    setState(newState);
  };

  const addRow = () => {
    // Reshape object and add new row based on doctype fields structure
    const stateObject = doctypeFields.reduce((acc, val) => {
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
      } else {
        acc[field_name] = val.default;
      }

      return acc;
    }, {});

    setState((prev) => prev.concat([stateObject]));
  };

  const deleteRows = () => {
    const newState = state.filter(
      (data, index) => selectedItemsKeys.indexOf(index.toString()) === -1
    );

    setState(newState);
    setSelectedItems({});
  };

  const selectItem = (e) => {
    const { index } = e.currentTarget.dataset;
    const newState = { ...selectedItems };

    if (newState[index]) {
      delete newState[index];
    } else {
      newState[index] = state[index];
    }

    setSelectedItems(newState);
  };

  const selectAllItems = (e) => {
    if (selectedItemsKeys.length === state.length) {
      setSelectedItems({});
    } else {
      setSelectedItems(
        state.reduce((acc, val, idx) => {
          acc[idx] = val;
          return acc;
        }, {})
      );
    }
  };

  return (
    <Container columns={columns}>
      <Label>{label}</Label>
      <Table>
        <TableRow>
          <TableHeader>
            {!locked && (
              <StyledIcon
                icon={areAllSelected ? "check-square" : "square"}
                selected={areAllSelected}
                onClick={selectAllItems}
              />
            )}
          </TableHeader>
          {doctypeListFields.map(({ label }) => (
            <TableHeader key={label}>{label}</TableHeader>
          ))}
        </TableRow>

        {state.length > 0 &&
          state.map((data, index) => (
            <TableRow key={index}>
              <TableColumn>
                {!locked && (
                  <StyledIcon
                    icon={selectedItems[index] ? "check-square" : "square"}
                    data-index={index}
                    selected={selectedItems[index]}
                    onClick={selectItem}
                  />
                )}
              </TableColumn>
              {doctypeListFields.map((field) => (
                <TableColumn key={field.field_name}>
                  <Inputs>
                    <Input
                      doc={state[index]}
                      idx={index}
                      onChange={onLocalChange}
                      {...field}
                    />
                  </Inputs>
                </TableColumn>
              ))}
            </TableRow>
          ))}

        {!locked && (
          <Buttons>
            <Button onClick={addRow}>Agregar</Button>

            {selectedItemsKeys.length > 0 && (
              <Button bgColor="#e21515" color="#ffffff" onClick={deleteRows}>
                Eliminar
              </Button>
            )}
          </Buttons>
        )}
      </Table>
    </Container>
  );
};

export default TableInput;
