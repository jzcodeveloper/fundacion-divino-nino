import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { isEqual } from "lodash";
import PropTypes from "prop-types";

import TabItem from "../TabItem";

import { Container, Heading, Items } from "./styles";

const Tab = ({ title, items }) => {
  const [activeLink, setActiveLink] = useState(items[0].link);
  const { location } = useHistory();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <Container>
      <Heading>{title}</Heading>
      <Items>
        {items.map(({ caption, link }) => (
          <TabItem
            key={link}
            active={link === activeLink}
            caption={caption}
            link={link}
          />
        ))}
      </Items>
    </Container>
  );
};

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      caption: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

Tab.defaultProps = {
  title: "",
  items: [],
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.title, nextProps.title);

export default React.memo(Tab, areEqual);
