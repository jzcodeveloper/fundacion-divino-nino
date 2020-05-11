import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import requirementsData from "../../../data/job-requirements";
import { selectSummaryData } from "../../../store/contributor/selectors";

import BronzeMedal from "../../../assets/images/medal-bronze.png";
import SilverMedal from "../../../assets/images/medal-silver.png";
import GoldMedal from "../../../assets/images/medal-gold.png";

import LevelInformation from "../LevelInformation";

import { Container, Flex, Element, Medal, Button } from "./styles";
import { BronzeButton, SilverButton, GoldButton } from "./styles";

const LevelSummary = () => {
  const data = useSelector(selectSummaryData);
  const [requirements] = useState(requirementsData);
  const [level, setLevel] = useState(0);
  const [show, setShow] = useState(false);

  const showModal = useCallback((e) => {
    const { level } = e.target.dataset;
    setLevel(Number(level));
    setShow(true);
  }, []);

  const hideModal = useCallback(() => setShow(false), []);

  return (
    <Container>
      <Flex>
        <Element>
          <Medal src={BronzeMedal} data={data} requirement={requirements[0]} />
          <BronzeButton
            data={data}
            data-level={0}
            requirement={requirements[0]}
            onClick={showModal}
          >
            Nivel 1
          </BronzeButton>
        </Element>
        <Element>
          <Medal src={SilverMedal} data={data} requirement={requirements[1]} />
          <SilverButton
            data={data}
            data-level={1}
            requirement={requirements[1]}
            onClick={showModal}
          >
            Nivel 2
          </SilverButton>
        </Element>
        <Element>
          <Medal src={GoldMedal} data={data} requirement={requirements[2]} />
          <GoldButton
            data={data}
            data-level={2}
            requirement={requirements[2]}
            onClick={showModal}
          >
            Nivel 3
          </GoldButton>
        </Element>
      </Flex>

      <LevelInformation
        show={show}
        level={level}
        data={data}
        colors={["#ed9d5e", "#c1c4c3", "#f0c75e"]}
        hide={hideModal}
      />
    </Container>
  );
};

export default LevelSummary;
