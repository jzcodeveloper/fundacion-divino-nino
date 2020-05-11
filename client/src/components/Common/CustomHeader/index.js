import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Background, Container, Name, Links, StyledLink, Text } from "./styles";
import { LongText } from "./styles";

const CustomHeader = ({ items }) => {
  return (
    <Background>
      <Container>
        <Name>
          <Text>Universidad Alonso de Ojeda</Text>
          <LongText>Universidad Alonso de Ojeda</LongText>
        </Name>
        <Links>
          {items.map(({ link, shortCaption, longCaption, icon }) => (
            <StyledLink key={link} to={link}>
              <Text>{shortCaption}</Text>
              <LongText>{longCaption}</LongText>
            </StyledLink>
          ))}
        </Links>
      </Container>
    </Background>
  );
};

CustomHeader.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      shortCaption: PropTypes.string,
      longCaption: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
};

CustomHeader.defaultProps = {
  items: [],
};

export default CustomHeader;
