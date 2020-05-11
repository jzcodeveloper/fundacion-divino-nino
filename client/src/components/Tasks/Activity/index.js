import React from "react";
import { useSelector } from "react-redux";

import { selectGlobalActivityForChart } from "../../../store/tasks/selectors";
import { selectTasksActivityForChart } from "../../../store/admin/selectors";

import activityData from "../../../data/job-activity";
import CustomChart from "../../Common/CustomChart";

import { Container, Heading, Margin } from "./styles";

const Activity = () => {
  const activity = useSelector(selectGlobalActivityForChart);
  const activity2 = useSelector(selectTasksActivityForChart);

  return (
    <Container>
      <Heading>Tareas Completadas</Heading>
      <CustomChart type="line" data={activity} />
      <Margin />
      <Heading>Tareas Creadas</Heading>
      <CustomChart type="line" data={activity2} />
    </Container>
  );
};

export default Activity;
