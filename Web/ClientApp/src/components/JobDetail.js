import React, { useState, useEffect } from "react";
import { actionCreators } from "../store/Jobs";
import { useDispatch, useSelector } from "react-redux";
import EditJobForm from "./EditJobForm";
import { Link } from "react-router-dom";

import { ListGroup, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const initialState = {
  showModal: false,
  detailEditView: false,
  validated: false,
  totalComp: 0,
  totalRate: 0,
  totalHours: 0,
  message: "",
  isLoading: true,
};

const JobDetail = (props) => {
  const dispatch = useDispatch();
  const { jobId } = props.match.params;

  useEffect(() => {
    dispatch(actionCreators.requestJobById(jobId));
  }, [jobId]);

  const fetchingJob = useSelector((state) => state.jobs.isLoading);

  useEffect(() => {
    if (fetchingJob === false) {
      setState({
        ...state,
        isLoading: false,
      });
    }
  }, [fetchingJob]);

  const {
    id,
    rate,
    hoursWorked,
    employer,
    jobTitle,
    location,
    compensation,
    startDate = Date(),
    endDate = Date(),
    paid,
    dateInvoiced = Date(),
  } = useSelector((state) => state.jobs.jobDetail);

  const [state, setState] = useState(initialState);
  const {
    detailEditView,
    showModal,
    validated,
    totalComp,
    totalRate,
    totalHours,
    isLoading,
  } = state;

  // Modal handling
  const handleClose = () => {
    setState(() => ({
      ...state,
      detailEditView: false,
      validated: false,
      showModal: false,
    }));
  };
  const handleShow = () => {
    setState(() => ({
      ...state,
      showModal: true,
    }));
  };

  const toggleView = () => {
    if (detailEditView === true) {
      setState(() => ({
        ...state,
        detailEditView: false,
        validated: false,
      }));
    } else {
      setState(() => ({
        ...state,
        detailEditView: true,
      }));
    }
  };

  const detailView = (
    <ListGroup variant="flush">
      <h1>{jobTitle}</h1>

      <ListGroup.Item>
        <strong>Employer </strong>
        {employer}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Location </strong>
        {location}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Total Compensation </strong>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(compensation)}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Start Date </strong>
        {new Date(startDate).toLocaleDateString()}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>End Date </strong>
        {new Date(endDate).toLocaleDateString()}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Paid? </strong>
        {paid ? "Yes" : "No"}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Date Invoiced </strong>
        {new Date(dateInvoiced).toLocaleDateString()}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Rate </strong>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(rate)}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Hours Worked </strong>
        {hoursWorked}
      </ListGroup.Item>
    </ListGroup>
  );

  return (
    <>
      <Link to="/jobs">
        <Button variant="outline-primary" className="mt-3">
          <FontAwesomeIcon icon={faAngleLeft} /> Back to All Jobs
        </Button>
      </Link>
      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div>
          {detailEditView ? (
            <EditJobForm
              id={jobId}
              rate={rate}
              hoursWorked={hoursWorked}
              employer={employer}
              jobTitle={jobTitle}
              location={location}
              compensation={compensation}
              startDate={startDate}
              endDate={endDate}
              paid={paid}
              dateInvoiced={dateInvoiced}
            />
          ) : (
            detailView
          )}
          <Button onClick={toggleView}>
            {detailEditView ? "Cancel" : "Edit"}
          </Button>
        </div>
      )}
    </>
  );
};

export default JobDetail;
