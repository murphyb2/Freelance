import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store/Jobs";
import { Spinner, Table, Button } from "react-bootstrap";
// import JobsSummary from "./JobsSummary";

const JobDashboard = () => {
  const dispatch = useDispatch();
  const jobList = useSelector(state => state.jobs.jobs);
  const isLoading = useSelector(state => state.jobs.isLoading);

  useEffect(() => {
    dispatch(actionCreators.requestJobs());
  }, []);

  if (!isLoading) {
    return (
      <div>
        <h1>Jobs</h1>
        <p>These are the jobs you've completed this year</p>
        {/* <AddJob /> */}
        <Link to="/add">Add Job</Link>
        {renderJobsTable(jobList)}
        {/* <JobsSummary jobsList={jobList} /> */}
      </div>
    );
  }
  return (
    <div>
      <h1>Jobs</h1>
      <p>These are the jobs you've completed this year</p>
      <h2 className="text-center">
        <Spinner animation="grow" />
      </h2>
    </div>
  );
};

const renderJobsTable = jobList => {
  return (
    <Table responsive striped size="md" variant="dark">
      <thead>
        <tr>
          <th>Employer</th>
          <th>Job Title</th>
          <th>Location</th>
          <th>Compensation</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Date Invoiced</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {jobList.map(job => (
          <tr key={job.id} className={job.paid === true ? "" : "bg-warning"}>
            <td className="align-middle">{job.employer}</td>
            <td className="align-middle">{job.jobTitle}</td>
            <td className="align-middle">{job.location}</td>
            <td className="align-middle">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(job.compensation)}
            </td>
            <td className="align-middle">
              {new Date(job.startDate).toLocaleDateString()}
            </td>
            <td className="align-middle">
              {new Date(job.endDate).toLocaleDateString()}
            </td>
            <td className="align-middle">
              {new Date(job.dateInvoiced).toLocaleDateString()}
            </td>
            <td className="align-middle">
              <Link to={`/jobs/${job.id}`}>
                <Button>Details</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default JobDashboard;
