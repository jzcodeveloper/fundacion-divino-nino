import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { useSortBy } from "../../../hooks/customHooks";

import Spinner from "../../UI/Spinner";
import TableHeader from "./TableHeader";
import TableDescription from "./TableDescription";

import { defaultStructure } from "./styles";
import { Table, TableRow, Message } from "./styles";

const CustomTable = ({ headers, data, message, loading, structure }) => {
  const [info, sorting, key, descending, setSortBy] = useSortBy(data);

  const keys = info[0] ? Object.keys(info[0]) : null;

  const onClick = useCallback(
    (e) => setSortBy({ key: e.target.dataset.key, descending: !descending }),
    [descending]
  );

  return (
    <Table>
      <TableRow structure={structure}>
        {headers.map((header, index) => (
          <TableHeader
            key={header}
            data-key={keys ? keys[index] : undefined}
            onClick={keys ? onClick : undefined}
          >
            {header}
          </TableHeader>
        ))}
      </TableRow>

      {keys ? (
        info.map((info, index) => (
          <TableRow key={info.id} structure={structure}>
            {headers.map((header, index) => (
              <TableDescription
                key={header}
                data-label={headers[index]}
                headers={headers}
              >
                {info[keys[index]]}
              </TableDescription>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <Message>{message}</Message>
        </TableRow>
      )}

      {sorting || loading ? (
        <Spinner overlayColor="rgba(255, 255, 255, 0.5)" />
      ) : null}
    </Table>
  );
};

CustomTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  structure: PropTypes.string.isRequired,
};

CustomTable.defaultProps = {
  headers: [],
  data: [],
  message: "",
  loading: true,
  structure: defaultStructure,
};

export default CustomTable;
