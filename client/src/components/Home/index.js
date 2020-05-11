import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container } from "./styles";

const Home = () => {
  const [state, setState] = useState({});

  const dispatch = useDispatch();

  const store = useSelector((state) => state);

  useEffect(() => {
    //
    return () => {};
  }, []);

  return <Container></Container>;
};

export default Home;
