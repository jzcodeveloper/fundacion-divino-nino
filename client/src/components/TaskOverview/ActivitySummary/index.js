import React from "react";
import { useSelector } from "react-redux";

import { selectActivityForChart } from "../../../store/contributor/selectors";

import CustomChart from "../../Common/CustomChart";

const ActivitySummary = () => {
  const activityData = useSelector(selectActivityForChart);

  return <CustomChart type="bar" data={activityData} />;
};

export default ActivitySummary;
