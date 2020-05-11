import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import axios from "../../../store/axios";
import { selectDataset } from "../../../store/datasets/selectors";

import { Link } from "./styles";

const Download = ({ show, hide, id }) => {
  const dataset = useSelector(selectDataset(id));
  const linkRef = useRef();

  useEffect(() => {
    if (show) {
      (async () => {
        const res = await axios.get(`/datasets/${id}/export`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));

        linkRef.current.href = url;
        linkRef.current.download = `${dataset.title}.zip`;
        linkRef.current.click();

        window.URL.revokeObjectURL(url);

        hide();
      })();
    }
  }, [show]);

  return <Link ref={linkRef}></Link>;
};

Download.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  id: PropTypes.string,
};

Download.defaultProps = {
  show: false,
};

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

export default React.memo(Download, areEqual);
