import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { actionCreators } from "../store/Jobs";
import { Spinner, Table, Modal, Button } from "react-bootstrap";

const JobDetail = (props) => {
  const jobDetail = props.job;
  console.log(jobDetail);

  // Modal handling
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Details</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>{jobDetail.jobTitle}</Modal.Header>
        <Modal.Body>this is the body</Modal.Body>
      </Modal>
    </>
  );
};

export default JobDetail;
