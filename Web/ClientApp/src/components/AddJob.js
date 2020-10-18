import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/Jobs";
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
      <h1>Add Job</h1>
      <JobForm onSubmit={handleSubmit} />
    </>
  );
};

export default AddJob;
