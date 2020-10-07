import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopNavBar from "./TopNavBar";
import { ToastSuccess } from "./shared/Toasts";

export default (props) => (
  <>
    <TopNavBar />
    <ToastSuccess />
    <Container>
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  </>
);
