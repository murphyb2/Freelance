import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

function AddJob() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form.jobTitle.value);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
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

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                id="location"
                type="text"
                placeholder="Location"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save & Add
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddJob;
