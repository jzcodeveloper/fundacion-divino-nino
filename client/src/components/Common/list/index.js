import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { timeSince } from "../../../utils/utils";

import {
  selectDoctype,
  selectDoctypeFields,
  selectDoctypeListFields,
  selectDoctypePermissions,
  selectDoctypeSearchFields,
} from "../../../store/doctypes/selectors";

import {
  setListSort,
  setListLimit,
  resetDocuments,
  fetchDocumentsRequest,
  deleteDocumentsRequest,
} from "../../../store/documents/actions";

import {
  selectSort,
  selectLimit,
  selectDocuments,
} from "../../../store/documents/selectors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopSection from "../top_section";
import Filters from "../filters";
import Input from "../input";
import Button from "../button";

const Container = styled.div`
  margin-bottom: 100px;
`;

const Heading = styled.h2``;

const Table = styled.div`
  min-height: calc(100vh - 200px);
  border-left: 1px solid #d1d8dd;
  border-right: 1px solid #d1d8dd;

  margin: 0 auto;

  @media (min-width: 750px) {
    width: 80%;
  }
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  height: 40px;
  font-size: 0.75em;
  border-bottom: 1px solid #d1d8dd;
  cursor: pointer;

  :first-child {
    background-color: #f7fafc;
  }

  :hover {
    background-color: #f7fafc;
  }
`;

const TableDescription = `
  flex: 1;
  pointer-events: none;

  :first-child {
    flex: 0;
    min-width: 26px;
  }

  :nth-child(2) {
    flex: 1.5;
  }

  :last-child {
    flex: 0.5;
  }
`;

const TableHeader = styled.div`
  ${TableDescription}
  color: #8d99a6;
`;

const TableColumn = styled.div`
  ${TableDescription}
  color: #6c7680;
`;

const StyledLinkA = styled(Link)`
  color: #36414c;
  transition: color 0.5s;
  pointer-events: all;

  :hover {
    color: #161b1f;
    text-decoration: underline;
  }
`;

const StyledLinkB = styled(Link)`
  margin-left: auto;
  color: inherit;
  pointer-events: all;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.1em;
  cursor: pointer;
  pointer-events: all;

  path {
    color: ${(props) => (props.selected ? "inherit" : "#d1d8dd")};
  }
`;

const Span = styled.span`
  color: inherit;
  pointer-events: all;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const Message = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 191px);
`;

const Text = styled.span`
  font-size: 0.8em;
  color: #8d99a6;
  margin-bottom: 10px;
`;

const Buttons = styled.div`
  margin: 0 auto;
  padding: 10px 10px;
  border-left: 1px solid #d1d8dd;
  border-right: 1px solid #d1d8dd;
  border-bottom: 1px solid #d1d8dd;
  border-radius: 0 0 3px 3px;

  @media (min-width: 750px) {
    width: 80%;
  }
`;

const ListView = ({ match }) => {
  const doctype = match.params.doctype;
  const history = useHistory();
  const dispatch = useDispatch();
  const doctypeData = useSelector(selectDoctype(doctype));
  const doctypeFields = useSelector(selectDoctypeFields(doctype));
  const doctypeListFields = useSelector(selectDoctypeListFields(doctype));
  const doctypePermissions = useSelector(selectDoctypePermissions(doctype));
  const doctypeSearchFields = useSelector(selectDoctypeSearchFields(doctype));
  const documentData = useSelector(selectDocuments(doctype));

  const limit = useSelector(selectLimit(doctype));
  const sort = useSelector(selectSort(doctype));

  const [state, setState] = useState(documentData);
  const [filters, setFilters] = useState({});
  const [selectedItems, setSelectedItems] = useState({});

  const selectedItemsKeys = Object.keys(selectedItems);
  const areAllSelected =
    selectedItemsKeys.length > 0 && selectedItemsKeys.length === state.length;

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    setState(documentData);
  }, [documentData]);

  useEffect(() => {
    fetchDocuments();
  }, [limit]);

  const redirectToForm = (e) => {
    const name = e.target.dataset.name;
    const link = `/desk/Form`;
    if (name) history.push(`${link}/${doctype}/${name}`);
    else history.push(`${link}/${doctype}/New ${doctype}`);
  };

  const fetchDocuments = () => {
    // Populate every Link and Table Link field
    const populate = doctypeFields
      .reduce((acc, val) => {
        if (val.field_type === "Link" || val.field_type === "Table Link") {
          acc.push(val.field_name);
        }
        return acc;
      }, [])
      .join(",");

    const query = { model: doctype, populate, limit, sort };
    dispatch(fetchDocumentsRequest(query));
  };

  const deleteDocuments = () => {
    const query = { model: doctype };

    const [subfields, submodels] = doctypeFields.reduce(
      (acc, val) => {
        if (val.field_type === "Table") {
          acc[0].push(val.field_name);
          acc[1].push(val.options);
        }
        return acc;
      },
      [[], []]
    );

    query.subfields = subfields.join(",");
    query.submodels = submodels.join(",");

    const [ids, names] = selectedItemsKeys.reduce(
      (acc, val, idx) => {
        acc[0].push(state[val]._id);
        acc[1].push(state[val].name);
        return acc;
      },
      [[], []]
    );

    dispatch(deleteDocumentsRequest(query, { ids, names }));
    setSelectedItems({});
    fetchDocuments();
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

  const loadMore = (e) => {
    const limit = Number(e.target.dataset.limit);
    dispatch(setListLimit({ model: doctype, limit }));
  };

  const addFilter = () => {
    //
  };

  const clearFilters = () => {
    //
  };

  const onChange = (index, name, value) => {
    /* setFilters({ ...filters, [name]: value }); */
  };

  return (
    <Container>
      <TopSection
        left={<Heading>{doctypeData.caption}</Heading>}
        right={
          selectedItemsKeys.length > 0 ? (
            <Button bgColor="#e21515" color="#ffffff" onClick={deleteDocuments}>
              Eliminar
            </Button>
          ) : (
            <>
              <Button onClick={fetchDocuments}>Refrescar</Button>
              {doctypePermissions.create && (
                <Button
                  bgColor="#4343e2"
                  color="#ffffff"
                  onClick={redirectToForm}
                >
                  Nuevo
                </Button>
              )}
            </>
          )
        }
      />

      {/* <Filters /> */}

      <Table>
        <TableRow>
          <TableHeader>
            {doctypePermissions.delete && (
              <StyledIcon
                icon={areAllSelected ? "check-square" : "square"}
                selected={areAllSelected}
                onClick={selectAllItems}
              />
            )}
          </TableHeader>
          {doctypeListFields.map(({ label }) => (
            <TableHeader>{label}</TableHeader>
          ))}
          <TableHeader></TableHeader>
          <TableHeader></TableHeader>
        </TableRow>

        {state.length > 0 &&
          state.map((data, index) => (
            <TableRow data-name={data.name}>
              <TableColumn>
                {doctypePermissions.delete && (
                  <StyledIcon
                    icon={selectedItems[index] ? "check-square" : "square"}
                    data-index={index}
                    selected={selectedItems[index]}
                    onClick={selectItem}
                  />
                )}
              </TableColumn>
              {doctypeListFields.map(
                ({ bold, field_name, field_type, options }, index) => {
                  let value = data[field_name];

                  if (field_type === "Link" || field_type === "Table Link") {
                    const [, title] = options.split(" | ");
                    value = data[field_name][title];
                  }

                  return (
                    <TableColumn>
                      <Span bold={bold}>
                        {index === 0 ? (
                          <StyledLinkA
                            to={`/desk/Form/${doctype}/${data.name}`}
                          >
                            {value}
                          </StyledLinkA>
                        ) : field_type === "Check" ? (
                          value ? (
                            <StyledIcon icon="check" color="#8D99A6" />
                          ) : (
                            <StyledIcon icon="square" color="#EEEEEE" />
                          )
                        ) : (
                          value
                        )}
                      </Span>
                    </TableColumn>
                  );
                }
              )}

              <TableColumn style={{ color: "#8d99a6", textAlign: "right" }}>
                <Span>
                  <StyledLinkB to={`/desk/Form/${doctype}/${data.name}`}>
                    {data.name}
                  </StyledLinkB>
                </Span>
              </TableColumn>

              <TableColumn style={{ color: "#8d99a6", textAlign: "right" }}>
                <Span>{timeSince(data.updated_at)}</Span>
              </TableColumn>
            </TableRow>
          ))}

        {state.length === 0 ? (
          <Message>
            <Text>No se encontraron {doctypeData.caption.toLowerCase()}</Text>
            <Button bgColor="#4343e2" color="#ffffff" onClick={redirectToForm}>
              Crear Nuevo
            </Button>
          </Message>
        ) : null}
      </Table>

      <Buttons>
        <Button
          onClick={loadMore}
          bgColor={limit === 20 ? "#999999" : "#e3e7eb"}
          color={limit === 20 ? "#fbfbfb" : "#555555"}
          data-limit={20}
        >
          20
        </Button>
        <Button
          onClick={loadMore}
          bgColor={limit === 100 ? "#999999" : "#e3e7eb"}
          color={limit === 100 ? "#fbfbfb" : "#555555"}
          data-limit={100}
        >
          100
        </Button>
        <Button
          onClick={loadMore}
          bgColor={limit === 500 ? "#999999" : "#e3e7eb"}
          color={limit === 500 ? "#fbfbfb" : "#555555"}
          data-limit={500}
        >
          500
        </Button>
      </Buttons>
    </Container>
  );
};

export default ListView;
