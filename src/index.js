import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
