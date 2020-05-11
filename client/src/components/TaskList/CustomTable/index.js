import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { useSortBy } from "../../../hooks/customHooks";

import Spinner from "../../UI/Spinner";
import TableHeader from "./TableHeader";
import TableDescription from "./TableDescription";

import { defaultStructure } from "./styles";
import { Table, TableRow, Message } from "./styles";

const CustomTable = ({ headers, data, message, loading }) => {
  const split = useMemo(
    () =>
      data.reduce(
        (acc, val) => {
          const { _id, ...rest } = val;
          acc[0].push(_id);
          acc[1].push({ ...rest });
          return acc;
        },
        [[], []]
      ),
    [data]
  );

  const [info, sorting, key, descending, setSortBy] = useSortBy(split[1]);

  const keys = info[0] ? Object.keys(info[0]) : null;

  const onClick = useCallback(
    (e) => setSortBy({ key: e.target.dataset.key, descending: !descending }),
    [descending]
  );

  return (
    <Table>
      <TableRow structure={defaultStructure}>
        {headers.map((header, index) => (
          <TableHeader
            key={header}
            data-key={keys ? keys[index] : undefined}
            id={keys ? keys[index] : undefined}
            sort={key}
            descending={descending}
            onClick={keys ? onClick : undefined}
          >
            {header}
          </TableHeader>
        ))}
      </TableRow>

      {keys ? (
        info.map((info, i) => (
          <TableRow key={info.id} structure={defaultStructure}>
            {headers.map((header, index) => (
              <TableDescription
                key={header}
                headers={headers}
                data-label={headers[index]}
                link={
                  keys[index] === "title" ? `/tasks/list/${split[0][i]}` : ""
                }
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
        <Spinner overlayColor="rgba(255,255,255,0.5)" />
      ) : null}
    </Table>
  );
};

CustomTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

CustomTable.defaultProps = {
  headers: [],
  data: [],
  message: "",
  loading: true,
};

export default CustomTable;
