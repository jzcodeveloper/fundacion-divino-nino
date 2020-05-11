import React, { useCallback } from "react";
import { useHistory } from "react-router";

import ContributorImage from "../../assets/images/contributor.png";
import AdminImage from "../../assets/images/contributor.png";
import Content from "../../hoc/Content";

import { Container, Top, Title, Middle, Card, Image, Text } from "./styles";

const Login = () => {
  const history = useHistory();

  const pushHistory = useCallback((e) => {
    history.push(e.currentTarget.dataset.link);
  }, []);

  return (
    <Content>
      <Container>
        <Top>
          <Title>¿Cuál es tu rol en el sistema?</Title>
        </Top>
        <Middle>
          <Card onClick={pushHistory} data-link="/login/admin">
            <Image src={AdminImage} />
            <Text>Administrador</Text>
          </Card>
          <Card onClick={pushHistory} data-link="/login/contributor">
            <Image src={ContributorImage} />
            <Text>Contribuyente</Text>
          </Card>
        </Middle>
      </Container>
    </Content>
  );
};

export default Login;
