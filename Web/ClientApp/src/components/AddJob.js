import React, { useState, useEffect } from "react";
import {
  Form,
  Modal,
  ButtonGroup,
  Button,
  Alert,
  Spinner,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../store/Jobs";

const AddJob = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [totalComp, setComp] = useState(0);
  const [totalRate, setRate] = useState(0);
  const [totalHours, setHours] = useState(0);
  const calculateComp = (event) => {
    event.target.id === "hoursWorked"
      ? setHours(event.target.value)
      : setRate(event.target.value);
  };

  useEffect(() => {
    setComp(Number(totalHours) * Number(totalRate));
  }, [totalRate, totalHours]);

  const addJobError = useSelector((state) => state.jobs.error);
  const addSuccess = useSelector((state) => state.jobs.processedJobSuccess);
  useEffect(() => {
    if (validated && !!addSuccess) {
      handleClose();
    }
  }, [validated, addSuccess]);

  const handleClose = () => {
    setValidated(false);
    setComp(0);
    setHours(0);
    setRate(0);

    setShow(false);
    dispatch(actionCreators.requestJobs());
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    setIsLoading(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(
        actionCreators.addNewJob({
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
        })
      );
    }
    setIsLoading(false);
    setValidated(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Job
      </Button>
      <Modal show={show} onHide={handleClose} centered size="lg">
        {addJobError && <Alert variant="danger">{addJobError}</Alert>}
        <Modal.Header closeButton>
          <Modal.Title>Add Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                id="jobTitle"
                type="text"
                placeholder="Job Title"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Employer</Form.Label>
              <Form.Control
                id="employer"
                type="text"
                placeholder="Employer"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                id="location"
                type="text"
                placeholder="Location"
                required
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
                    defaultValue={totalHours}
                  />
                </Form.Group>
                <Form.Group as={Col} onChange={calculateComp}>
                  <Form.Label>Rate</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        $
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      id="rate"
                      type="number"
                      step=".01"
                      placeholder="Hourly Rate"
                      required
                      defaultValue={totalRate}
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
                  <Form.Control id="startDate" type="date" required />
                </Col>
                <Col>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control id="endDate" type="date" required />
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Check type="checkbox" id="paid" label="Invoice Paid" />
                </Col>
                <Col>
                  <Form.Label>Date Invoiced</Form.Label>
                  <Form.Control id="dateInvoiced" type="date" />
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Row className="justify-content-center">
              <ButtonGroup size="lg" className="mb-2">
                <Button variant="primary" type="submit">
                  {isLoading ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    >
                      Saving...
                    </Spinner>
                  ) : (
                    "Save & Add"
                  )}
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddJob;
