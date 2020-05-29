import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { actionCreators } from "../store/Jobs";
import { Spinner, Table, Modal, Button } from "react-bootstrap";

const JobDetail = (props) => {
  const jobDetail = props.job;
  console.log(jobDetail);

  // Modal handling
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Details</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>{jobDetail.jobTitle}</Modal.Header>
        <Modal.Body>this is the body</Modal.Body>
        {/* <Table responsive>
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
                  <Link to={`/jobs/${job.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </Modal>
    </>
  );
};

export default JobDetail;
