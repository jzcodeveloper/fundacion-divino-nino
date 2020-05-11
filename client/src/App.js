import React, { useState, useEffect } from "react";

import ErrorBoundary from "./components/Common/ErrorBoundary";
import Navbar from "./containers/Navbar";
import Loading from "./components/UI/Loading";
import Routes from "./hoc/Routes";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </>
  );
};

export default App;
