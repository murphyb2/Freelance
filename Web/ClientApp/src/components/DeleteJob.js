import React, { useState } from "react";
import { Button, Modal, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/Jobs";

export const DeleteJob = ({ jobName, jobId }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleDeleteJob = () => {
    dispatch(actionCreators.deleteJob(jobId));
    history.push("/jobs");
  };

  return (
    <>
      <Button onClick={handleShowDelete} variant="danger">
        Delete Job
      </Button>
      <Modal show={showDelete} onHide={handleCloseDelete} centered size="lg">
        <Modal.Header>Are you sure you want to delete {jobName}?</Modal.Header>
        <ButtonGroup>
          <Button onClick={handleDeleteJob} variant="danger">
            Confirm Delete
          </Button>
          <Button onClick={handleCloseDelete}>Cancel</Button>
        </ButtonGroup>
      </Modal>
    </>
  );
};

export default DeleteJob;
