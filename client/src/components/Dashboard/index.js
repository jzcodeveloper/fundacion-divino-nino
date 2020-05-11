import React from "react";
import { useSelector } from "react-redux";

import { formatDate, getGreetings } from "../../utils/utils";
import { selectAdmin } from "../../store/admin/selectors";

import Global from "./Global";
import Activity from "./Activity";
import Logs from "./Logs";

import { Container, Heading, Small } from "./styles";

const Summary = () => {
  const admin = useSelector(selectAdmin);

  return (
    <Container>
      <Heading>
        {getGreetings()}, {admin.degree} {admin.username}
      </Heading>
      <Small>
        {admin.lastSignIn.length === 1
          ? `¡Primera vez que ingresas al sistema! Hoy es ${formatDate(
              admin.lastSignIn[0]
            )}.`
          : `Se conectó por última vez el día ${formatDate(
              admin.lastSignIn[0],
              "/"
            )}.`}
      </Small>

      <Global />

      <Activity />

      <Logs />
    </Container>
  );
};

export default Summary;
