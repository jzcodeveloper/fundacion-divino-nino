import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Public from "../public_route";
import Private from "../private_route";
import Navbar from "../../components/navbar";
import NotFound from "../../components/common/not_found";
import Logout from "../../components/common/logout";
import Login from "../../components/login";
import Desk from "../../components/desk";
import ListView from "../../components/common/list";
import FormView from "../../components/common/form";

const Routes = () => (
  <>
    <Route path="/" component={Navbar} />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/desk" />} />
      <Public exact path="/auth/login" component={Login} />
      <Private exact path="/logout" component={Logout} />
      <Private exact path="/desk" component={Desk} />
      <Private exact path="/desk/List/:doctype" component={ListView} />
      <Private exact path="/desk/Form/:doctype/:docname" component={FormView} />
    </Switch>
  </>
);

export default Routes;
