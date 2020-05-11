import React, { useState } from "react";
import PropTypes from "prop-types";

import requirementsData from "../../../data/job-requirements";

import { Container, Icon, Text } from "./styles";

const LevelRequirement = ({ data, color, level }) => {
  const [requirements] = useState(requirementsData);

  const key = Object.keys(data)[0];
  const value = Object.values(data)[0];

  const { min, message1, message2 } = requirements[level][key];

  const icon = value >= min ? ["fas", "check-circle"] : ["far", "circle"];
  const message = value >= min ? message1 : message2;

  return (
    <Container>
      <Icon icon={icon} color={value >= min ? color : ""} />
      <Text>{message}</Text>
    </Container>
  );
};

LevelRequirement.propTypes = {
  data: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

LevelRequirement.defaultProps = {
  data: {},
  color: "",
  level: 0,
};

export default LevelRequirement;
