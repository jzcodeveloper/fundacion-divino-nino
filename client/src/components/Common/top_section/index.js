import React from "react";

import { Container, Section, Left, Right } from "./styles";

const TopSection = ({ left, right }) => {
  return (
    <Container>
      <Section>
        <Left>{left}</Left>
        <Right>{right}</Right>
      </Section>
    </Container>
  );
};

export default TopSection;
