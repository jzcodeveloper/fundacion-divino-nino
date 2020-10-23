import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDoctypesRequest } from "./store/doctypes/actions";
import { selectLoading } from "./store/doctypes/selectors";

import ErrorBoundary from "./components/common/error_boundary";
import Loading from "./components/common/loading";
import Routes from "./hoc/routes";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchDoctypesRequest());
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
};

export default App;
