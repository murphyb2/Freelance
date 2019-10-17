import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavMenu from "./NavMenu";
import Sidebar from "./Sidebar";

export default props => (
  <>
    <Container fluid>
      <Row>
        <Col sm={3} className="px-0">
          <NavMenu />
          {/* <Sidebar /> */}
        </Col>
        <Col sm={9}>{props.children}</Col>
      </Row>
    </Container>
  </>
);
