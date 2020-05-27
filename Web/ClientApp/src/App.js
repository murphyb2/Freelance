import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchJobs from "./components/FetchJobs";

import "./index.css";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/jobs/:startDateIndex?" component={FetchJobs} />
    {/* <Route path="/jobs" component={FetchJobs} /> */}
  </Layout>
);
