import React, { useState, useEffect } from "react";
import { Button, Modal, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../store/Jobs";
import { useHistory } from "react-router";

export default function DeleteJob(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDelete, setShowDelete] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleDeleteJob = () => {
    alert("Deleted!");
    // re render this route
    history.go();
  };

  //   if (redirect == true) return <Redirect push to="/jobs" />;
  //   else
  return (
    <>
      <Button onClick={handleShowDelete} variant="danger">
        Delete Job
      </Button>
      <Modal show={showDelete} onHide={handleCloseDelete} centered size="lg">
        <Modal.Header>
          Are you sure you want to delete {props.jobName}?
        </Modal.Header>
        <ButtonGroup>
          <Button onClick={handleDeleteJob} variant="danger">
            Confirm Delete
          </Button>
          <Button onClick={handleCloseDelete}>Cancel</Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}
