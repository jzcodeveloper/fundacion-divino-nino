import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { isEqual } from "lodash";

import {
  fetchTableLinkDocumentsRequest,
  updateTableLinkDocumentData,
} from "../../../../store/table_links/actions";

import { selectDoctype } from "../../../../store/doctypes/selectors";

import { selectFilteredTableLinkDocument } from "../../../../store/table_links/selectors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  position: relative;
  grid-column: ${(props) => props.columns};
`;

const Label = styled.label`
  color: ${(props) => (props.valid ? "#8d99a6" : "#ff5858")};
`;

const Input = styled.input`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const Options = styled.div`
  position: absolute;
  top: 50px;
  width: 100%;
  border: 1px solid #d1d8dd;
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.176);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  background-color: #fbfbfb;
`;

const Option = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 8px 12px;
  min-height: 50px;
  cursor: pointer;
  transition: color 0.2s;

  :hover {
    color: #36414c;
    background-color: #f0f4f7;
  }
`;

const Title = styled.h4`
  pointer-events: none;
  font-size: 0.8rem;
  font-weight: bold;
  color: inherit;
`;

const Description = styled.span`
  pointer-events: none;
  font-size: 0.7rem;
  color: inherit;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 0.9rem;
  margin-right: 10px;

  path {
    color: #5e64ff;
  }
`;

const Create = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #5e64ff;
  border-radius: 0 0 4px 4px;
`;

const TableLinkInput = ({
  autoFocus,
  idx,
  bold,
  columns,
  doc,
  field_name,
  label,
  options,
  onChange,
  read_only,
  required,
  set_only_once,
  ...props
}) => {
  const [
    model,
    parent_model,
    parent_name,
    populate,
    title,
    description,
  ] = options.split(" | ");

  const [state, setState] = useState({ _id: null, [title]: "" });
  const [valid, setValid] = useState(false);
  const [parentName, setParentName] = useState("");
  const [firstRender, setFirstRender] = useState(true);
  const [locked, setLocked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  const inputRef = useRef();
  const doctypeData = useSelector(selectDoctype(parent_model));
  const documentData = useSelector(
    selectFilteredTableLinkDocument({
      model,
      parent_model,
      parent_name: parentName,
      populate,
    })
  );

  // Set new filtered data whenever state[title] changes
  useEffect(() => {
    let valid = false;
    if (required) {
      if (!state[title]) {
        inputRef.current.setCustomValidity("Este campo es requerido");
        valid = false;
      } else if (!state._id) {
        inputRef.current.setCustomValidity("Este valor es inválido");
        valid = false;
      } else {
        inputRef.current.setCustomValidity("");
        valid = true;
      }
    } else {
      valid = true;
      if (!state[title] || (state[title] && state._id)) {
        inputRef.current.setCustomValidity("");
        valid = true;
      } else {
        inputRef.current.setCustomValidity("Este valor es inválido");
        valid = false;
      }
    }

    const filtered = documentData.filter(
      (doc) => doc[title].toLowerCase().indexOf(state[title].toLowerCase()) > -1
    );
    setFilteredData(filtered);
    setValid(valid);
  }, [state[title]]);

  // Set state whenever the value changes
  useEffect(() => {
    if (doc[field_name]) {
      if (Object.keys(doc[field_name]).length > 0) {
        // Handle the set_only_once property
        if (set_only_once && firstRender) {
          if (doc[field_name]._id) {
            setLocked(true);
          }
          setFirstRender(false);
        }

        setState(doc[field_name]);
      }
    }
  }, [doc[field_name]]);

  // Make new request whenever defaultName changes, and reset filtered data
  useEffect(() => {
    if (doc[parent_name].name) {
      setParentName(doc[parent_name].name);

      const query = {
        model,
        parent_model,
        parent_name: doc[parent_name].name,
        populate,
      };

      dispatch(fetchTableLinkDocumentsRequest(query));
    } else {
      const value = { _id: null, [title]: "" };
      onChange(idx, field_name, value);
    }
  }, [doc[parent_name]]);

  // Set new filtered data whenever the input receives focus
  const onFocus = (e) => {
    const filtered = documentData.filter(
      (doc) => doc[title].toLowerCase().indexOf(state[title].toLowerCase()) > -1
    );
    setFilteredData(filtered);
    setShowOptions(true);
  };

  const onBlur = (e) => {
    onChange(idx, field_name, state);
    setTimeout(() => setShowOptions(false), 150);
  };

  const onLocalChange = (e) => {
    const value = { _id: null, [title]: e.target.value };
    setState(value);
  };

  const selectOption = (e) => {
    const value = filteredData[e.target.dataset.index];
    onChange(idx, field_name, value);
  };

  return (
    <Container columns={columns}>
      <Label htmlFor={field_name} valid={valid}>
        {label}
      </Label>
      <Input
        type="text"
        bold={bold}
        name={field_name}
        disabled={read_only || locked}
        required={required}
        ref={inputRef}
        value={state[title]}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onLocalChange}
        autoComplete="off"
        autoFocus={autoFocus}
      />
      {showOptions ? (
        <Options>
          {filteredData.map((doc, index) => (
            <Option key={doc[title]} onClick={selectOption} data-index={index}>
              <Title>{doc[title]}</Title>
              {description ? (
                <Description>{doc[description]}</Description>
              ) : null}
            </Option>
          ))}

          {doctypeData.quick_entry ? (
            <Option>
              <Create>
                <StyledIcon icon="plus"></StyledIcon>Crear nuevo {label}
              </Create>
            </Option>
          ) : null}
        </Options>
      ) : null}
    </Container>
  );
};

export default TableLinkInput;
