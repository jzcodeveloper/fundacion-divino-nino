import React, { useState } from "react";
import { isEqual } from "lodash";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import Button from "../CustomButton";

import { Container, Icon, Message, Input } from "./styles";

const FileInput = ({
  message,
  error,
  accept,
  caption,
  extensions,
  disabled,
  onChange,
  autoFocus,
}) => {
  const [state, setState] = useState({ msg: message, file: null });

  const { msg, file } = state;

  const onLocalChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    /* /csv/ */
    const filetypes = new RegExp(extensions.replace(",", "|"));
    /* /text\/csv|application\/vnd\.ms-excel/ */
    const mimetypes = new RegExp(accept.replace(",", "|"));

    const split = file.name.split(".");
    const extension = split[split.length - 1];

    const isValid = filetypes.test(extension) && mimetypes.test(file.type);

    if (isValid) {
      if (onChange) onChange(file);
      setState({ msg: message, file });
      return;
    }

    e.target.value = "";
    setState({ msg: error, file: null });
    return;
  };

  return (
    <Container>
      <Icon icon="download" fixedWidth />
      <Message>{file ? `${file.name} (${file.size} bytes)` : msg}</Message>
      <Button inverted>{caption}</Button>
      <Input
        type="file"
        accept={accept}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={onLocalChange}
      />
    </Container>
  );
};

FileInput.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  extensions: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
};

FileInput.defaultProps = {
  message: "",
  error: "",
  accept: "",
  caption: "",
  extensions: "",
  disabled: false,
  autoFocus: false,
};

export default FileInput;
