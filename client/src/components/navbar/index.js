import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import AppIcon from "../../assets/icons/app-icon-original.png";
import AvatarImg from "../../assets/images/avatar.png";

import { selectDoctype } from "../../store/doctypes/selectors";
import { selectUser } from "../../store/user/selectors";

import { Container, Flex, Left, Right, Icon, StyledIcon } from "./styles";
import { User, Avatar, Name, Span, HomeLink, LoginLink } from "./styles";
import { Options, Option } from "./styles";

const Navbar = ({ history, location: { pathname } }) => {
  const user = useSelector(selectUser);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!user) setShowMenu(false);
  }, [user]);

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const onClick = useCallback(() => {
    history.push("/desk");
  }, []);

  const logoutUser = useCallback(() => {
    history.push("/logout");
  }, []);

  const shouldShowMenu = () => {
    setShowMenu(true);
  };

  const shouldHideMenu = () => {
    setTimeout(() => setShowMenu(false), 150);
  };

  return (
    <Container user={user}>
      <Flex>
        <Left>
          {user && <Icon src={AppIcon} alt="HIS" onClick={onClick} />}
        </Left>
        <Right>
          {user && (
            <User onClick={shouldShowMenu} onBlur={shouldHideMenu} tabIndex={0}>
              <Avatar src={AvatarImg} alt="avatar" />
              <Name>{user.full_name}</Name>
              {showMenu ? (
                <Options>
                  <Option onClick={logoutUser}>Salir del Sistema</Option>
                </Options>
              ) : null}
            </User>
          )}
        </Right>
      </Flex>
    </Container>
  );
};

export default Navbar;
