import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "../../components/UI/NotFound";
import Logout from "../../components/Common/Logout";

const Routes = () => (
  <Switch>
    <Route exact path="/logout" component={Logout} />
  </Switch>
);

export default Routes;
