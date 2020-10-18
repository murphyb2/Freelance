import React, { useState, useEffect } from "react";
import { actionCreators } from "../../store/Jobs";
import { useDispatch, useSelector } from "react-redux";
import DeleteJob from "../DeleteJob";
import {
  Form,
  ButtonGroup,
  Button,
  Spinner,
  Col,
  InputGroup,
} from "react-bootstrap";
import DatePicker from "react-date-picker";

const defaultJob = {
  id: "",
  rate: "",
  hoursWorked: "",
  compensation: "",
  employer: "",
  jobTitle: "",
  location: "",
  startDate: Date(),
  endDate: undefined,
  paid: false,
  dateInvoiced: undefined,
};
const JobForm = ({ job = defaultJob, onSubmit }) => {
  // State
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
  } = job;
  const [validated, setValidated] = useState(false);
  const newDateInvoiced = dateInvoiced
    ? new Date(dateInvoiced).toISOString().substr(0, 10)
    : undefined;
  const newEndDate = endDate
    ? new Date(endDate).toISOString().substr(0, 10)
    : undefined;
  const [jobCompleted, setJobCompleted] = useState(!!endDate);
  const [invoicePaid, setInvoicePaid] = useState(paid);
  const [totalRate, setRate] = useState(rate);
  const [totalHours, setHours] = useState(hoursWorked);
  const [totalComp, setTotalComp] = useState(compensation);
  const isUpdating = useSelector(state => state.jobs.updatingJob);

  // Event handlers
  const calculateComp = e => {
    e.target.id === "hoursWorked"
      ? setHours(e.target.value)
      : setRate(e.target.value);
  };

  useEffect(() => {
    setTotalComp(Number(totalHours) * Number(totalRate));
  }, [totalRate, totalHours]);

  const handleSubmit = e => {
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
    } = e.currentTarget;

    e.preventDefault();

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      onSubmit({
        id,
        jobTitle: jobTitle.value,
        employer: employer.value,
        location: location.value,
        hoursWorked: totalHours,
        rate: totalRate,
        compensation: Number(totalComp),
        startDate: startDate.value,
        endDate: newEndDate,
        dateInvoiced: newDateInvoiced,
        paid: invoicePaid,
      });
    }
  };

  const toggleJobCompleted = e => {
    setJobCompleted(!jobCompleted);
  };

  return (
    <>
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
          <Form.Control.Feedback className="font-italic" type="invalid">
            Job Title is required
          </Form.Control.Feedback>
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
          <Form.Control.Feedback className="font-italic" type="invalid">
            Employer is required
          </Form.Control.Feedback>
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
          <Form.Control.Feedback className="font-italic" type="invalid">
            Location is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Hours Worked</Form.Label>

              <Form.Control
                id="hoursWorked"
                type="number"
                step=".01"
                placeholder="Total Hours Worked"
                required
                onChange={calculateComp}
                defaultValue={totalHours}
              />
              <Form.Control.Feedback className="font-italic" type="invalid">
                Hours Worked is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
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
                  onChange={calculateComp}
                  defaultValue={totalRate}
                />
                <Form.Control.Feedback className="font-italic" type="invalid">
                  Rate is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Label>
            Compensation:{" "}
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
              <Form.Control.Feedback className="font-italic" type="invalid">
                Start Date is required
              </Form.Control.Feedback>

              <Form.Label>End Date</Form.Label>
              <Form.Control
                id="endDate"
                type="date"
                required={jobCompleted}
                defaultValue={newEndDate}
              />
              <Form.Control.Feedback className="font-italic" type="invalid">
                End Date is required if Job Completed is checked
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Row>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="jobCompleted"
                    label="Job completed?"
                    defaultChecked={jobCompleted}
                    onChange={toggleJobCompleted}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="paid"
                    label="Invoice Paid"
                    defaultChecked={invoicePaid}
                    onChange={() => setInvoicePaid(!invoicePaid)}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Form.Label>Date Invoiced</Form.Label>
                <Form.Control
                  id="dateInvoiced"
                  type="date"
                  required={invoicePaid}
                  defaultValue={newDateInvoiced}
                />
                <Form.Control.Feedback className="font-italic" type="invalid">
                  Date Invoiced is required if Invoice Paid is checked
                </Form.Control.Feedback>
              </Form.Row>
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Row className="justify-content-center">
          <ButtonGroup size="lg" className="mb-2">
            <Button variant="primary" type="submit">
              {isUpdating ? <Spinner animation="grow" /> : "Submit"}
            </Button>
            <DeleteJob jobName={jobTitle} jobId={id} />
          </ButtonGroup>
        </Form.Row>
      </Form>
    </>
  );
};

export default JobForm;
