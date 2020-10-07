import React, { useEffect, useState } from "react";
import { actionCreators } from "../store/Jobs";
import { useDispatch, useSelector } from "react-redux";
import DeleteJob from "./DeleteJob";
import {
  Form,
  ButtonGroup,
  Button,
  Spinner,
  Col,
  InputGroup,
} from "react-bootstrap";

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

export const EditJobForm = (props) => {
  const {
    id,
    rate,
    hoursWorked,
    employer,
    jobTitle,
    location,
    compensation,
    startDate,
    endDate,
    paid,
    dateInvoiced,
  } = props;

  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const { validated, totalComp, totalRate, totalHours } = state;

  const isUpdating = useSelector((state) => state.jobs.updatingJob);

  const handleSubmit = (event) => {
    const {
      jobTitle,
      employer,
      location,
      hoursWorked,
      rate,
      startDate,
      endDate,
      paid,
      dateInvoiced,
    } = event.currentTarget;

    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(
        actionCreators.updateJob(id, {
          jobTitle: jobTitle.value,
          employer: employer.value,
          location: location.value,
          hoursWorked: Number(hoursWorked.value),
          rate: Number(rate.value),
          compensation: Number(totalComp),
          startDate: startDate.value,
          endDate: endDate.value,
          dateInvoiced: paid.checked === true ? dateInvoiced.value : new Date(),
          paid: paid.checked,
          id,
        })
      );
    }
    setState(() => ({
      ...state,
      validated: true,
      detailEditView: false,
    }));
  };

  const calculateComp = (event) => {
    event.target.id === "hoursWorked"
      ? setState(() => ({ ...state, totalHours: event.target.value }))
      : setState(() => ({ ...state, totalRate: event.target.value }));
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      totalComp: Number(totalHours) * Number(totalRate),
    }));
  }, [totalRate, totalHours]);

  return (
    <>
      <h1>Editing {jobTitle}</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            id="jobTitle"
            type="text"
            placeholder="Job Title"
            required
            defaultValue={jobTitle}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Employer</Form.Label>
          <Form.Control
            id="employer"
            type="text"
            placeholder="Employer"
            required
            defaultValue={employer}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            id="location"
            type="text"
            placeholder="Location"
            required
            defaultValue={location}
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
                defaultValue={Number(hoursWorked)}
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
                  defaultValue={Number(rate)}
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
                defaultValue={new Date(startDate).toISOString().substr(0, 10)}
              />
            </Col>
            <Col>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                id="endDate"
                type="date"
                required
                defaultValue={new Date(endDate).toISOString().substr(0, 10)}
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
                defaultChecked={paid}
              />
            </Col>
            <Col>
              <Form.Label>Date Invoiced</Form.Label>
              <Form.Control
                id="dateInvoiced"
                type="date"
                defaultValue={new Date(dateInvoiced)
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
            <DeleteJob jobName={jobTitle} jobId={id} />
          </ButtonGroup>
        </Form.Row>
      </Form>
    </>
  );
};

export default EditJobForm;
