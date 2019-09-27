import React, { Component, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Jobs';
import { Modal, Form, Button } from 'react-bootstrap';
import AddJob from './AddJob.js'


class FetchJobs extends Component {
  //state = {
  //          modalShow: false,
  //          setModalShow: false
  //};

  componentWillMount() {
    // This method runs when the component is first added to the page
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestJobs(startDateIndex);
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
    this.props.requestJobs(startDateIndex);
  }
    
  render() {
    return (
      <div>
        <h1>Jobs</h1>
        <p>These are the jobs you've completed this year</p>
            {/*renderAddJobButton(this.props)*/}
            <Button variant="secondary" onClick="{renderAddJobForm()}">Add Job</Button>
            <AddJob />
            <AddJobButton/>
        {renderJobsTable(this.props)}
        {renderPagination(this.props)}
      </div>
    );
  }
}

function renderJobsTable(props) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Job Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Total Compensation</th>
        </tr>
      </thead>
      <tbody>
        {props.jobs.map(job =>
          <tr key={job.startDate}>
            <td>{job.startDate}</td>
            <td>{job.endDate}</td>
            <td>{job.jobTitle}</td>
            <td>{job.companyName}</td>
            <td>{job.location}</td>
            <td>{job.totalCompensation}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function renderPagination(props) {
  const prevStartDateIndex = (props.startDateIndex || 0) - 5;
  const nextStartDateIndex = (props.startDateIndex || 0) + 5;

  return <p className='clearfix text-center'>
    <Link className='btn btn-default pull-left' to={`/fetchjobs/${prevStartDateIndex}`}>Previous</Link>
    <Link className='btn btn-default pull-right' to={`/fetchjobs/${nextStartDateIndex}`}>Next</Link>
    {props.isLoading ? <span>Loading...</span> : []}
  </p>;
}

function AddJobButton() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);   
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                    <Form>
                        {/*
                         Install prop-types to use here
                         Need to have:
                            Job Title
                            Comapny Name
                            Location
                            Total Compensation
                            Start Date
                            End Date

                         */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default connect(
  state => state.jobs,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchJobs);
