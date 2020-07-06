import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import AppIcon from "../../assets/icons/app-icon-512x512.png";
import AvatarImg from "../../assets/images/avatar.png";

import { selectDoctype } from "../../store/doctypes/selectors";
import { selectUser } from "../../store/user/selectors";

import { Container, Flex, Left, Right, Icon, StyledIcon } from "./styles";
import { CurrentUser, Avatar, User, Span, HomeLink, LoginLink } from "./styles";

const Navbar = () => {
  const history = useHistory();
  const user = useSelector(selectUser);

  const onClick = useCallback((e) => history.push("/desk"), []);

  return (
    <Container user={user}>
      <Flex>
        <Left>
          {user && <Icon src={AppIcon} alt="HIS" onClick={onClick} />}
        </Left>
        <Right>
          {user && (
            <CurrentUser>
              <Avatar src={AvatarImg} alt="avatar" />
              <User>{user.full_name}</User>
            </CurrentUser>
          )}
        </Right>
      </Flex>
    </Container>
  );
};

export default Navbar;
