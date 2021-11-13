import React, { useRef, useState } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import "./export-chart.css";
import myData from '../data/data'

const ExportChart = ({orgchart}) => {

  const exportTo = () => {
    orgchart.current.exportTo(filename, fileextension);
  };

  const [filename, setFilename] = useState("organization_chart");
  const [fileextension, setFileextension] = useState("png");

  const onNameChange = event => {
    setFilename(event.target.value);
  };

  const onExtensionChange = event => {
    setFileextension(event.target.value);
  };

  return (
    <>
      <section className="toolbar">
        <label htmlFor="txt-filename">Filename:</label>
        <input
          id="txt-filename"
          type="text"
          value={filename}
          onChange={onNameChange}
          style={{ fontSize: "1rem", marginRight: "2rem" }}
        />
        <span>Fileextension: </span>
        <input
          id="rd-png"
          type="radio"
          value="png"
          checked={fileextension === "png"}
          onChange={onExtensionChange}
        />
        <label htmlFor="rd-png">png</label>
        <input
          style={{ marginLeft: "1rem" }}
          id="rd-pdf"
          type="radio"
          value="pdf"
          checked={fileextension === "pdf"}
          onChange={onExtensionChange}
        />
        <label htmlFor="rd-pdf">pdf</label>
        <button className={"greenButton"} onClick={exportTo} style={{ marginLeft: "2rem" }}>
          Export
        </button>
      </section>
    </>
  );
};

export default ExportChart;
