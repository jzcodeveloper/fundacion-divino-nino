import React from "react";
import PropTypes from "prop-types";

import Warning from "../../Common/CustomWarning";
import LevelRequirement from "../LevelRequirement";

const LevelInformation = ({ show, level, data, colors, hide }) => {
  const { totalTasks, totalQuestions, totalTime } = data;

  return (
    <Warning
      show={show}
      hide={hide}
      title={`Nivel ${level + 1}`}
      subtitle="Requerimientos"
      color={colors[level]}
      buttons={[
        {
          backgroundColor: colors[level],
          color: "#fbfbfb",
          caption: "Entendido",
        },
      ]}
    >
      <LevelRequirement
        data={{ totalTasks }}
        color={colors[level]}
        level={level}
      />

      <LevelRequirement
        data={{ totalQuestions }}
        color={colors[level]}
        level={level}
      />

      <LevelRequirement
        data={{ totalTime }}
        color={colors[level]}
        level={level}
      />
    </Warning>
  );
};

LevelInformation.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  data: PropTypes.shape({
    0: PropTypes.object.isRequired,
    1: PropTypes.object.isRequired,
    2: PropTypes.object.isRequired,
  }),
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

LevelInformation.defaultProps = {
  show: false,
  level: 0,
  data: { 0: {}, 1: {}, 2: {} },
  colors: [],
};

export default LevelInformation;
