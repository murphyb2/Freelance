import * as React from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store/Jobs";
import { Modal, Form, Button } from "react-bootstrap";
import AddJob from "./AddJob.js";

const FetchJobs = () => {
  //state = {
  //          modalShow: false,
  //          setModalShow: false
  //};

  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.jobs);
  const boundActionCreators = bindActionCreators(
    actionCreators.requestJobs,
    dispatch
  );

  React.useEffect(() => {
    dispatch(boundActionCreators);
  }, []);

  console.log("job list: " + jobList.jobs);

  if (!jobList.isLoading) {
    return (
      <div>
        <h1>Jobs</h1>
        <p>These are the jobs you've completed this year</p>
        {/*renderAddJobButton(this.props)*/}
        <AddJob />
        {/* {renderJobsTable(this.props)} */}
        {renderJobsTable(jobList)}
        {/* {renderPagination(startDateIndex)} */}
      </div>
    );
  }
  return (
    <div>
      <h1>Jobs</h1>
      <p>These are the jobs you've completed this year</p>
      <h2>Loading...</h2>
    </div>
  );
};

function renderJobsTable(jobList) {
  return (
    <table className="table">
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
        </tr>
      </thead>
      <tbody>
        {jobList.jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.employer}</td>
            <td>{job.jobTitle}</td>
            <td>{job.location}</td>
            {/* <td>{job.compensation}</td> */}
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function renderPagination(props) {
  const prevStartDateIndex = (props.startDateIndex || 0) - 5;
  const nextStartDateIndex = (props.startDateIndex || 0) + 5;

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
      {props.isLoading ? <span>Loading...</span> : []}
    </p>
  );
}

// export default connect(
//   (state) => state.jobs,
//   (dispatch) => bindActionCreators(actionCreators, dispatch)
// )(FetchJobs);
export default FetchJobs;
