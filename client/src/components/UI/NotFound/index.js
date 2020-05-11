import React from "react";

import NotFoundImage from "../../../assets/images/404.png";

import Content from "../../../hoc/Content";

import { Overlay, Image, Text } from "./styles";

const NotFound = () => (
  <Content>
    <Overlay>
      <Image src={NotFoundImage} />
      <Text>Lo sentimos, esta página no existe.</Text>
    </Overlay>
  </Content>
);

export default NotFound;
