import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store/Jobs";
import { Spinner, Modal, Form, Button, Table } from "react-bootstrap";
import AddJob from "./AddJob.js";
import JobDetail from "./JobDetail";

const FetchJobs = () => {
  //state = {
  //          modalShow: false,
  //          setModalShow: false
  //};

  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.jobs.jobs);
  const isLoading = useSelector((state) => state.jobs.isLoading);
  // const startDateIndex = useSelector((state) => state.jobs.startDateIndex);

  // console.log(`startDateIndex: ${startDateIndex}`);

  React.useEffect(() => {
    // dispatch(actionCreators.requestJobs(startDateIndex));
    dispatch(actionCreators.requestJobs());
  }, []);

  console.log(`job list: ${jobList}`);

  if (!isLoading) {
    return (
      <div>
        <h1>Jobs</h1>
        <p>These are the jobs you've completed this year</p>
        {/*renderAddJobButton(this.props)*/}
        <AddJob />
        {renderJobsTable(jobList)}
        {/* {renderPagination(startDateIndex)} */}
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

function renderJobsTable(jobList) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Employer</th>
          <th>Job Title</th>
          <th>Location</th>
          <th>Compensation</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Paid</th>
          <th>Date Invoiced</th>
          <th>Rate</th>
          <th>Hours Worked</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {jobList.map((job) => (
          <tr key={job.id}>
            <td>{job.employer}</td>
            <td>{job.jobTitle}</td>
            <td>{job.location}</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(job.compensation)}
            </td>
            <td>{new Date(job.startDate).toLocaleDateString()}</td>
            <td>{new Date(job.endDate).toLocaleDateString()}</td>
            <td>{job.paid ? "Yes" : "No"}</td>
            <td>{new Date(job.dateInvoiced).toLocaleDateString()}</td>
            <td>{job.rate}</td>
            <td>{job.hoursWorked}</td>
            <td>
              <JobDetail job={job} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function renderPagination(startIndex) {
  const prevStartDateIndex = (startIndex || 0) - 5;
  const nextStartDateIndex = (startIndex || 0) + 5;

  return (
    <p className="clearfix text-center">
      <Link
        className="btn btn-default pull-left"
        to={`/jobs/${prevStartDateIndex}`}
      >
        Previous
      </Link>
      <Link
        className="btn btn-default pull-right"
        to={`/jobs/${nextStartDateIndex}`}
      >
        Next
      </Link>
      {/* {isLoading ? <span>Loading...</span> : []} */}
    </p>
  );
}

export default FetchJobs;
