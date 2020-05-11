import React from "react";

import Gif from "../../../assets/gifs/machine-learning.gif";

import { Modal, Container, Image, Paragraph } from "./styles";

const Loading = () => (
  <Modal>
    <Container>
      <Image src={Gif} alt="Icon" />
    </Container>
    <Paragraph>Universidad</Paragraph>
    <Paragraph>Alonso de Ojeda</Paragraph>
  </Modal>
);

export default Loading;
