import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopNavBar from "./TopNavBar";

import { Link, NavLink } from "react-router-dom";

export default (props) => (
  <>
    <TopNavBar />
    <Container>
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  </>
);
