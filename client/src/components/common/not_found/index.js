import React from "react";

import NotFoundImage from "../../../assets/images/404.png";

import { Overlay, Image, Text } from "./styles";

const NotFound = () => (
  <Overlay>
    <Image src={NotFoundImage} />
    <Text>Lo sentimos, esta página no existe.</Text>
  </Overlay>
);

export default NotFound;
