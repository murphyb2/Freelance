import React, { useState, useEffect } from "react";
import { actionCreators } from "../store/Jobs";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  ListGroup,
  Modal,
  ButtonGroup,
  Button,
  Alert,
  Spinner,
  Col,
  InputGroup,
} from "react-bootstrap";
import DeleteJob from "./DeleteJob";

const JobDetail = (props) => {
  const jobDetail = props.job;
  const dispatch = useDispatch();

  const isUpdating = useSelector((state) => state.jobs.updatingJob);

  // Modal handling
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setView(false);
    setValidated(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [detailEditView, setView] = React.useState(false);
  const toggleView = () => {
    if (detailEditView === true) {
      setView(false);
      setValidated(false);
    } else {
      setView(true);
    }
  };

  // Form validation
  const [validated, setValidated] = useState(false);

  const [totalComp, setComp] = useState(0);
  const [totalRate, setRate] = useState(jobDetail.rate);
  const [totalHours, setHours] = useState(jobDetail.hoursWorked);
  const calculateComp = (event) => {
    event.target.id === "hoursWorked"
      ? setHours(event.target.value)
      : setRate(event.target.value);
  };

  useEffect(() => {
    setComp(Number(totalHours) * Number(totalRate));
  }, [totalRate, totalHours]);

  const updateSuccess = useSelector((state) => state.jobs.processedJobSuccess);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(
        actionCreators.updateJob(jobDetail.id, {
          jobTitle: form.jobTitle.value,
          employer: form.employer.value,
          location: form.location.value,
          hoursWorked: Number(form.hoursWorked.value),
          rate: Number(form.rate.value),
          compensation: Number(totalComp),
          startDate: form.startDate.value,
          endDate: form.endDate.value,
          dateInvoiced:
            form.paid.checked === true ? form.dateInvoiced.value : new Date(),
          paid: form.paid.checked,
          id: jobDetail.id,
        })
      );
    }
    setValidated(true);
  };

  const detailView = (
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
  );

  const editView = (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Alert
        show={updateSuccess === "success" ? true : false}
        variant="success"
        dismissible
        onClose={() => dispatch(actionCreators.clearAddJob())}
      >
        Job updated successfully!
      </Alert>
      <Form.Group>
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          id="jobTitle"
          type="text"
          placeholder="Job Title"
          required
          defaultValue={jobDetail.jobTitle}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Employer</Form.Label>
        <Form.Control
          id="employer"
          type="text"
          placeholder="Employer"
          required
          defaultValue={jobDetail.employer}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          id="location"
          type="text"
          placeholder="Location"
          required
          defaultValue={jobDetail.location}
        />
      </Form.Group>

      <Form.Group>
        <Form.Row>
          <Form.Group onChange={calculateComp} as={Col}>
            <Form.Label>Hours Worked</Form.Label>

            <Form.Control
              id="hoursWorked"
              type="number"
              step=".01"
              placeholder="Total Hours Worked"
              required
              defaultValue={Number(jobDetail.hoursWorked)}
            />
          </Form.Group>
          <Form.Group as={Col} onChange={calculateComp}>
            <Form.Label>Rate</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="rate"
                type="number"
                step=".01"
                placeholder="Hourly Rate"
                required
                defaultValue={Number(jobDetail.rate)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Label>Compensation: </Form.Label>
        <Form.Label id="compensation">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalComp)}
        </Form.Label>
      </Form.Group>

      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              id="startDate"
              type="date"
              required
              defaultValue={new Date(jobDetail.startDate)
                .toISOString()
                .substr(0, 10)}
            />
          </Col>
          <Col>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              id="endDate"
              type="date"
              required
              defaultValue={new Date(jobDetail.endDate)
                .toISOString()
                .substr(0, 10)}
            />
          </Col>
        </Form.Row>
      </Form.Group>

      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Check
              type="checkbox"
              id="paid"
              label="Invoice Paid"
              defaultChecked={jobDetail.paid}
            />
          </Col>
          <Col>
            <Form.Label>Date Invoiced</Form.Label>
            <Form.Control
              id="dateInvoiced"
              type="date"
              defaultValue={new Date(jobDetail.dateInvoiced)
                .toISOString()
                .substr(0, 10)}
            />
          </Col>
        </Form.Row>
      </Form.Group>

      <Form.Row className="justify-content-center">
        <ButtonGroup size="lg" className="mb-2">
          <Button variant="primary" type="submit">
            {isUpdating ? "Saving Changes..." : "Save Changes"}
            {isUpdating ? <Spinner animation="grow" /> : ""}
          </Button>
          <DeleteJob jobName={jobDetail.jobTitle} jobId={jobDetail.id} />
        </ButtonGroup>
      </Form.Row>
    </Form>
  );

  return (
    <>
      <Button onClick={handleShow}>Details</Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{jobDetail.jobTitle}</Modal.Title>
        </Modal.Header>
        {/* Editable Update Form */}
        <Modal.Body>{detailEditView ? editView : detailView}</Modal.Body>
        <Button onClick={toggleView}>
          {detailEditView ? "Cancel" : "Edit"}
        </Button>
      </Modal>
    </>
  );
};

export default JobDetail;
