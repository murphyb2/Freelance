import React, { useState } from "react";
import { Button, Modal, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/Jobs";

export const DeleteJob = ({ jobName, jobId }) => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleDeleteJob = () => {
    dispatch(actionCreators.deleteJob(jobId));
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
