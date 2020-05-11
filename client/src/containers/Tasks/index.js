import React from "react";
import { isEqual } from "lodash";

import AnimatedSwitch from "../../hoc/AnimatedSwitch";
import CustomRoute from "../../hoc/CustomRoute";
import Summary from "../../components/Tasks";
import Activity from "../../components/Tasks/Activity";
import History from "../../components/Tasks/History";
import NotFound from "../../components/UI/NotFound";

const Tasks = () => {
  return (
    <AnimatedSwitch>
      <CustomRoute
        exact
        path="/dashboard/tasks/overview"
        component={Summary}
        role="admin"
        animated
      />
      <CustomRoute
        exact
        path="/dashboard/tasks/activity"
        component={Activity}
        role="admin"
        animated
      />
      <CustomRoute
        exact
        path="/dashboard/tasks/history"
        component={History}
        role="admin"
        animated
      />
      <CustomRoute component={NotFound} animated />
    </AnimatedSwitch>
  );
};

const areEqual = (prevProps, nextProps) =>
  isEqual(prevProps.location.pathname, nextProps.location.pathname);

export default React.memo(Tasks, areEqual);
