import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import DefaultChart from "./default-chart/default-chart";
import MyChart from "./my-chart/my-chart";
import ViewData from "./data/ViewData"

import "./App.css";

const App = () => {
  return (
    
    <Router>
      <div className="wrapper">
        <nav>
          <NavLink to="/" activeClassName="selected">
            My Chart
          </NavLink>
          <NavLink to="/default-chart" activeClassName="selected">
            Default Chart
          </NavLink>
          <NavLink to="/data" activeClassName="selected">
            Data
          </NavLink>
        </nav>

        <Route path="/default-chart" component={DefaultChart} />
        <Route exact path="/" component={MyChart} />
        <Route path="/data" component={ViewData} />
      </div>
    </Router>
  );
};

export default App;
