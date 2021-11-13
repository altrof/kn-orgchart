import React, { useState } from "react";
import PropTypes from "prop-types";
import "./my-node.css";

const propTypes = {
  nodeData: PropTypes.object.isRequired,
};

const MyNode = ({ nodeData }) => {

  const [isCollapsed, setIsCollapsed] = useState(true);


  let amountChildren;
  if (Array.prototype.isPrototypeOf(nodeData.children)) {
    amountChildren = Object.entries(nodeData.children).length;
  }
 
  
  const toCollapse = () => {
    if(isCollapsed) {
      setIsCollapsed(false)
      ChildrenCollapsed()
    } else {
      setIsCollapsed(true)
      ChildrenCollapsed()
    }
  }
  
  const nodeOC = document.getElementsByClassName("oc-node")
  const ChildrenCollapsed = async () => {
    await nodeOC;
      if (nodeData.collapsed === true) {
        Object.entries(nodeData.children).map(el =>  {
          nodeOC[el[1].id].style.display = (isCollapsed ? 'none' : 'block');

        })
      }
  }

  ChildrenCollapsed();
 
  const verticalEdgeBottom = async () => {
    const bottomEdge = await document.getElementsByClassName("oc-edge verticalEdge bottomEdge oci ")
    //console.log(typeof bottomEdge);
    Object.entries(bottomEdge).map(el => {
      el[1].className = ""
    })
  }
  verticalEdgeBottom()
  
  

  return (
    <>
    <div>
      {nodeData.body ?
        <div className="headerBlock  withBody" style={{ backgroundColor: nodeData.color }} >
          {amountChildren != null && nodeData.collapsed === true && isCollapsed ? 
            (<div className=" amountChildren">
              {amountChildren != null && nodeData.collapsed === true && isCollapsed
              ? amountChildren : 
              <div></div>}
            </div>) : <div></div>}
          {nodeData.title}
        </div> :
        <div className="headerBlock onlyBody" style={{ backgroundColor: nodeData.color }}>
          {amountChildren != null && nodeData.collapsed === true && isCollapsed ?
            (<div className="amountChildren">
              {amountChildren != null && nodeData.collapsed === true && isCollapsed ? amountChildren : null}
            </div>) : <div></div>}
          {nodeData.title}
          
        </div>}

      {nodeData.body ? <div className="bodyBlock" style={{ borderColor: nodeData.color }}><a style={{ textDecoration: "none", color: nodeData.color || "#215a88" }} href={nodeData.link}>{nodeData.body}</a></div> : <div />}
      
    </div>
    {nodeData.children && nodeData.id != "n1" ? <button onClick={() => toCollapse()} >{isCollapsed ? "+" : "-"}</button> : null}
    </>
  );
}


MyNode.propTypes = propTypes;


export default MyNode;
