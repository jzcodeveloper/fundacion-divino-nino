import React from "react";

import Data from "./Data";
import Password from "./Password";

import { Container, Flex, Forms } from "./styles";

const Summary = () => {
  return (
    <Container>
      <Flex>
        <Forms>
          <Data />
        </Forms>
        <Forms>
          <Password />
        </Forms>
      </Flex>
    </Container>
  );
};

export default Summary;
