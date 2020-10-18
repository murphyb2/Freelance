import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/Jobs";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import JobForm from "./shared/JobForm";

const AddJob = () => {
  const dispatch = useDispatch();

  const handleSubmit = newJob => {
    try {
      dispatch(actionCreators.addNewJob(newJob));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <>
      <Link to="/jobs">
        <Button variant="outline-primary" className="mt-3">
          Cancel
        </Button>
      </Link>
      <h1>Add Job</h1>
      <JobForm onSubmit={handleSubmit} />
    </>
  );
};

export default AddJob;
