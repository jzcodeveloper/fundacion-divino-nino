import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "../../components/UI/NotFound";
import Dashboard from "../../containers/Dashboard";
import Logout from "../../components/Common/Logout";
import CustomRoute from "../CustomRoute";
import AnimatedSwitch from "../AnimatedSwitch";

import { routes } from "./navigation";

const Routes = () => (
  <Switch>
    <CustomRoute path="/dashboard" component={Dashboard} role="admin" />
    <Route exact path="/logout" component={Logout} />

    <AnimatedSwitch>
      {routes.map(({ path, component, role }) => (
        <CustomRoute
          key={path}
          exact
          path={path}
          component={component}
          role={role}
          animated
        />
      ))}
      <CustomRoute component={NotFound} animated />
    </AnimatedSwitch>
  </Switch>
);

export default Routes;
