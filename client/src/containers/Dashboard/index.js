import React from "react";
import { Switch, Route } from "react-router-dom";

import Content from "../../hoc/Content";
import Spinner from "../../components/UI/Spinner";
import NotFound from "../../components/UI/NotFound";
import CustomRoute from "../../hoc/CustomRoute";
import AnimatedSwitch from "../../hoc/AnimatedSwitch";
import Tab from "../../components/Navigation/Tab";
import Sidebar from "../../components/Navigation/Sidebar";
import Summary from "../../components/Dashboard";
import { routes, sidebar } from "./navigation";

import { Container } from "./styles";

const Dashboard = () => {
  return (
    <Container>
      <Sidebar items={sidebar} />

      <Content style={{ flexFlow: "column" }}>
        <Route exact path="/dashboard" component={Summary} />

        <Switch>
          {routes.map(({ path, title, items }) => (
            <Route
              key={path}
              path={path}
              render={() => <Tab title={title} items={items} />}
            />
          ))}
        </Switch>

        <AnimatedSwitch>
          {routes.map(({ path, component, role }) => (
            <CustomRoute
              key={path}
              path={path}
              component={component}
              role={role}
              animated
            />
          ))}
          <CustomRoute component={NotFound} animated />
        </AnimatedSwitch>
      </Content>
    </Container>
  );
};

export default Dashboard;
