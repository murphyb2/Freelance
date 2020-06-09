import * as React from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import FetchJobs from "./components/FetchJobs";
import JobDetail from "./components/JobDetail";

import "./index.css";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Switch>
      <Route exact path="/jobs" component={FetchJobs} />
      <Route
        exact
        path="/jobs/:jobId"
        render={(props) => <JobDetail {...props} id={"hello"} />}
      />
    </Switch>
    {/* <Route path="/jobs" component={FetchJobs} /> */}
  </Layout>
);
