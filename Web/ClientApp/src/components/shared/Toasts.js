import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../store/Jobs";
import { Toast, Alert } from "react-bootstrap";

export const ToastSuccess = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const processedJobSuccess = useSelector(
    (state) => state.jobs.processedJobSuccess
  );

  useEffect(() => {
    if (!!processedJobSuccess) {
      setShow(true);
    }
  }, [processedJobSuccess]);

  const handleClose = () => {
    setShow(false);
    dispatch(actionCreators.clearMessages());
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
      }}
      className="pr-3 pt-3 justify-content-end"
    >
      <Toast onClose={handleClose} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{processedJobSuccess}</Toast.Body>
      </Toast>
    </div>
  );
};

export const ToastError = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const jobError = useSelector((state) => state.jobs.error);

  useEffect(() => {
    if (!!jobError) {
      setShow(true);
    }
  }, [jobError]);

  const handleClose = () => {
    setShow(false);
    dispatch(actionCreators.clearMessages());
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
      }}
      className="pr-3 pt-3 justify-content-end"
    >
      <Toast onClose={handleClose} show={show} delay={6000} autohide>
        <Toast.Header>
          <Alert variant="danger">
            <strong className="mr-auto">Error!</strong>
          </Alert>
        </Toast.Header>
        <Toast.Body>{jobError}</Toast.Body>
      </Toast>
    </div>
  );
};
