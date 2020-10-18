import React from "react";
import { actionCreators } from "../store/Jobs";
import { useDispatch } from "react-redux";
import JobForm from "./shared/JobForm";

export const EditJobForm = ({ job }) => {
  const dispatch = useDispatch();

  const handleSubmit = newJob => {
    try {
      dispatch(actionCreators.updateJob(newJob));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <>
      <h1>Editing {job.jobTitle}</h1>
      <JobForm job={job} onSubmit={handleSubmit} />
    </>
  );
};

export default EditJobForm;
