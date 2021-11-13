import React, { useRef, useState } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import JSONDigger from "json-digger";
import { v4 as uuidv4 } from "uuid";
import "./my-chart.css";
import myData from "../data/data"
import MyNode from "./my-node";
import ExportChart from './../export-chart/export-chart';

const MyChart = () => {
  const orgchart = useRef();

  const [ds, setDS] = useState(myData);
  const dsDigger = new JSONDigger(ds, "id", "children");

  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [newNodes, setNewNodes] = useState([{ name: "", title: "" }]);
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [newNodeBody, setNewNodeBody] = useState("");
  const [newNodeColor, setNewNodeColor] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [isChangeMode, setIsChangeMode] = useState(false)
  const [isViewMode, setIsViewMode] = useState(true)

  const defaultColor = "#215a88";


  
  const readSelectedNode = nodeData => {
    if (isMultipleSelect) {
      setSelectedNodes(prev => new Set(prev.add(nodeData)));
    } else {
      setSelectedNodes(new Set([nodeData]));
    }
  };

  const clearSelectedNode = () => {
    setSelectedNodes(new Set());
  };

  const onBodyChangeNewNode = (e, index) => {
    newNodes[index].body = e.target.value;
    setNewNodes([...newNodes]);
  };

  const onTitleChangeNewNode = (e, index) => {
    newNodes[index].title = e.target.value;
    setNewNodes([...newNodes]);
  };

  const onBodyChange = e => {
    setNewNodeBody(e.target.value);
  };

  const onTitleChange = e => {
    setNewNodeTitle(e.target.value);
  };

  const onColorChange = e => {
    setNewNodeColor(e.target.value);
  };

  const updateNodes = async () => {
    if (newNodeTitle != "") {
      await dsDigger.updateNodes([...selectedNodes].map(node => node.id), {
        id: uuidv4(),
        title: newNodeTitle,
        body: newNodeBody,
        color: newNodeColor
      });
      setDS({ ...dsDigger.ds });
      setNewNodeTitle("");
      setNewNodeBody("");
      setNewNodeColor("");
    }
  };

  const addNewNode = () => {
    setNewNodes(prevNewNodes => [...prevNewNodes, { name: "", title: "" }]);
  };

  const removeNewNode = index => {
    setNewNodes(prevNewNodes => {
      prevNewNodes.splice(index, 1);
      return [...prevNewNodes];
    });
  };

  const getNewNodes = () => {
    const nodes = [];
    for (const node of newNodes) {
      nodes.push({ ...node, id: uuidv4() });
    }
    return nodes;
  };

  const addChildNodes = async () => {
    await dsDigger.addChildren([...selectedNodes][0].id, getNewNodes());
    setDS({ ...dsDigger.ds });
  };

  const addSiblingNodes = async () => {
    await dsDigger.addSiblings([...selectedNodes][0].id, getNewNodes());
    setDS({ ...dsDigger.ds });
  };

  const addRootNode = () => {
    dsDigger.addRoot(getNewNodes()[0]);
    setDS({ ...dsDigger.ds });
  };

  // logic for remove button
  const remove = async () => {
    await dsDigger.removeNodes([...selectedNodes].map(node => node.id));
    setDS({ ...dsDigger.ds });
    setSelectedNodes(new Set());
  };

  // logic for checkbox of multiple selecting
  const onMultipleSelectChange = e => {
    setIsMultipleSelect(e.target.checked);
  };

  const onModeChangeEdit = e => {
    setIsEditMode(e.target.checked);
    if (e.target.checked) {
      orgchart.current.expandAllNodes();
    }
    setIsViewMode(false)
  };

  const onModeChangeView = () => {
    setIsViewMode(true)
    setIsEditMode(false)
    }

  return (
    <div className="edit-chart-wrapper">
      <div style={{margin: "40px 10px 10px 5px"}}>
        <input
          style={{ marginLeft: "1rem" }}
          id="edit-mode"
          type="checkbox"
          checked={isEditMode}
          onChange={onModeChangeEdit}
        />
        <label htmlFor="edit-mode"> {isEditMode ? (<b>Edit Mode</b>) : "Edit Mode"}</label> 

        <input
          style={{ marginLeft: "1rem" }}
          id="view-mode"
          type="checkbox"
          checked={isViewMode}
          onChange={onModeChangeView}
        />
        <label htmlFor="view-mode"> {isViewMode ? (<b>View Mode</b>) : "View Mode"}</label> 
      </div>
      {isEditMode ?
        (<section className="toolbar">
          <div className="selected-nodes">
            <div>
              <h4 style={{ display: "inline-block" }}>Selected Node</h4>
              <input
                style={{ marginLeft: "1rem" }}
                id="cb-multiple-select"
                type="checkbox"
                checked={isMultipleSelect}
                onChange={onMultipleSelectChange}
              />
              <label htmlFor="cb-multiple-select">Multiple Select</label>
            </div>
            <ul>
              {Array.from(selectedNodes).map(node => (
                <div style={{ border: "1px solid #000", padding: "8px", margin: "8px" }}>
                  <li key={node.id}>
                    {node.title} - {node.body}
                  </li>
                  <div style={{ display: "inline-block" }}>
                    Color: <div style={{
                      backgroundColor: (node.color ? node.color : defaultColor) // getComputedStyle(event.target).getPropertyValue("background-color")}
                    }}
                      className="windowColor" />
                  </div>

                  <div style={{margin: "5px 5px 5px 0"}}>{!isChangeMode
                    ? <button className="change" onClick={() => setIsChangeMode(true)}>Change</button>
                    : <button className="exit" onClick={() => setIsChangeMode(false)}>Exit</button>
                  }
                  </div>

                  <div className="new-nodes" style={!isChangeMode ? { display: "none" } : { display: "block" }}>
                    <h4>Edit Node Data</h4>

                    <div>
                      <input
                        type="text"
                        placeholder={node.title}
                        value={newNodeTitle}
                        onChange={onTitleChange}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder={node.body}
                        value={newNodeBody}
                        onChange={onBodyChange}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder={node.color ? node.color : defaultColor}
                        value={newNodeColor}
                        onChange={onColorChange}
                      />
                    </div>

                    <div>
                      <button style={{ width: "100%" }} disabled={!isEditMode} onClick={updateNodes}>
                        Update Nodes
                      </button>
                    </div>
    
                  </div>
                </div>
            ))}
            </ul>
          </div >
          
          <div className="new-nodes">
            <h4>New Nodes</h4>
            <ul>
              {newNodes &&
                newNodes.map((node, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      placeholder="title"
                      value={node.title}
                      onChange={e => onTitleChangeNewNode(e, index)}
                    />
                    <input
                      type="text"
                      placeholder="body"
                      value={node.body}
                      onChange={e => onBodyChangeNewNode(e, index)}
                    />
                    {newNodes.length === 1 || index === newNodes.length - 1 ? (
                      <button disabled={!isEditMode} onClick={addNewNode}>
                        +
                      </button>
                    ) : (
                      <button
                        disabled={!isEditMode}
                        onClick={() => removeNewNode(index)}
                      >
                        -
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </div>
          <div className="action-buttons">
            <button disabled={!isEditMode} onClick={addChildNodes}>
              Add Child Nodes
            </button>
            <button disabled={!isEditMode} onClick={addSiblingNodes}>
              Add Sibling Nodes
            </button>
            <button disabled={!isEditMode} onClick={addRootNode}>
              Add Root Node
            </button>
            <button disabled={!isEditMode} onClick={remove}>
              Remove Nodes
            </button>

          </div>
        </section >) : <div></div>}
      <OrganizationChart
        ref={orgchart}
        datasource={ds}
        collapsible={true}
        multipleSelect={isMultipleSelect}
        onClickNode={readSelectedNode}
        onClickChart={clearSelectedNode}
        pan={true}
        zoom={true}
        draggable={isEditMode}
        chartClass="myChart"
        NodeTemplate={MyNode}
      />
      <ExportChart orgchart={orgchart}  />
    </div >
  );
};

export default MyChart;
