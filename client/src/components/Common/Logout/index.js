import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { logoutUserRequest } from "../../../store/user/actions";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUserRequest());
  }, []);

  return <Redirect to="/login" />;
};

Logout.propTypes = {};

Logout.defaultProps = {};

export default Logout;
