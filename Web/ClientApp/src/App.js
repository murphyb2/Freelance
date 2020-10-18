import * as React from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import JobDashboard from "./components/JobDashboard";
import JobDetail from "./components/JobDetail";
import AddJob from "./components/AddJob";

import "./index.css";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Switch>
      <Route exact path="/jobs" component={JobDashboard} />
      <Route path="/add" component={AddJob} />
      <Route
        exact
        path="/jobs/:jobId"
        component={JobDetail}
        // render={(props) => <JobDetail {...props} id={"hello"} />}
      />
    </Switch>
  </Layout>
);
