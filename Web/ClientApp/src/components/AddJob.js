import React, { useState } from "react";
import {
  Form,
  Modal,
  ButtonGroup,
  Button,
  FormControl,
  Col,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/Jobs";

function AddJob() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = (event) => {
    setValidated(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(
        actionCreators.addNewJob({
          jobTitle: form.jobTitle.value,
          employer: form.employer.value,
          location: form.location.value,
          hoursWorked: 82.4,
          compensation: 1809.55,
          startDate: "2020-05-30T00:00:00",
          endDate: "2020-05-30T00:00:00",
          dateInvoiced: "2020-05-30T00:00:00",
          paid: form.paid.value ? true : false,
          rate: 25.99,
        })
      );
    }
    setValidated(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Job
      </Button>
      {/* 
HoursWorked
Compensation
StartDate
EndDate
DateInvoiced
Paid
Rate */}

      <Modal show={show} onHide={handleClose} centered size="lg">
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

            <Form.Group controlId="paid">
              <Form.Check type="checkbox" label="Invoice Paid" />
            </Form.Group>
            <Form.Row className="justify-content-center">
              <ButtonGroup size="lg" className="mb-2">
                <Button variant="primary" type="submit">
                  Save & Add
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Form.Row>
          </Form>
        </Modal.Body>

        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default AddJob;
