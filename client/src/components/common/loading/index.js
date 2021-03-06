import React from "react";

import AppIcon from "../../../assets/images/logo.png";

import { Modal, Container, Image, Paragraph } from "./styles";

const Loading = () => (
  <Modal>
    <Container>
      <Image src={AppIcon} alt="Icon" />
    </Container>
  </Modal>
);

export default Loading;
