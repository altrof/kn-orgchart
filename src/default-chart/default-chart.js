import React from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import myData from "../data/data"

const DefaultChart = () => {
  return <OrganizationChart datasource={myData} />;
};

export default DefaultChart;
