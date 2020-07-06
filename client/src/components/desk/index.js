import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { selectAllowedDoctypes } from "../../store/doctypes/selectors";

import { Container, Items, Item, Icons, Icon, Caption } from "./styles";

const Desk = ({ location }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const allowedDoctypes = useSelector(selectAllowedDoctypes);

  const onClick = useCallback((e) => {
    history.push(`${location.pathname}/List/${e.target.dataset.name}`);
  }, []);

  return (
    <Container>
      <Items>
        {allowedDoctypes.map(({ name, caption, color, icon }) => (
          <Item key={name}>
            <Icons color={color} data-name={name} onClick={onClick}>
              <Icon icon={icon} fixedWidth />
            </Icons>
            <Caption>{caption}</Caption>
          </Item>
        ))}
      </Items>
    </Container>
  );
};

export default Desk;
