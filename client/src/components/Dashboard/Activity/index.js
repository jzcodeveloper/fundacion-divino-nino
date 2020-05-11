import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectGlobalActivityForChart } from "../../../store/tasks/selectors";
import { selectLoginActivityForChart } from "../../../store/admin/selectors";
import {
  selectTasksActivityForChart,
  selectModelsActivityForChart,
  selectContributorsActivityForChart,
} from "../../../store/app/selectors";

import CustomChart from "../../Common/CustomChart";

import { Container, Charts, Chart, Heading } from "./styles";

const Activity = () => {
  const activity1 = useSelector(selectLoginActivityForChart);
  const activity2 = useSelector(selectTasksActivityForChart);
  const activity3 = useSelector(selectModelsActivityForChart);
  const activity4 = useSelector(selectContributorsActivityForChart);

  return (
    <Container>
      <Charts>
        <Chart>
          <Heading>Ingresos al Sistema</Heading>
          <CustomChart type="line" data={activity1} delay={500} />
        </Chart>
        <Chart>
          <Heading>Tareas Creadas</Heading>
          <CustomChart type="line" data={activity2} delay={500} />
        </Chart>
      </Charts>
      <Charts>
        <Chart>
          <Heading>Modelos Creados</Heading>
          <CustomChart type="line" data={activity3} delay={500} />
        </Chart>
        <Chart>
          <Heading>Usuarios Registrados</Heading>
          <CustomChart type="line" data={activity4} delay={500} />
        </Chart>
      </Charts>
    </Container>
  );
};

export default Activity;
