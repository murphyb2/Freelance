import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { actionCreators } from "../store/Jobs";
import { Spinner, ListGroup, Modal, Button } from "react-bootstrap";

const JobDetail = (props) => {
  const jobDetail = props.job;
  // console.log(jobDetail);

  // Modal handling
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Details</Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{jobDetail.jobTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Employer </strong>
              {jobDetail.employer}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Job Title </strong>
              {jobDetail.jobTitle}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Location </strong>
              {jobDetail.location}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total Compensation </strong>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(jobDetail.compensation)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Start Date </strong>
              {new Date(jobDetail.startDate).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>End Date </strong>
              {new Date(jobDetail.endDate).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Paid? </strong>
              {jobDetail.paid ? "Yes" : "No"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Date Invoiced </strong>
              {new Date(jobDetail.dateInvoiced).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Rate </strong>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(jobDetail.rate)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Hours Worked </strong>
              {jobDetail.hoursWorked}
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JobDetail;
