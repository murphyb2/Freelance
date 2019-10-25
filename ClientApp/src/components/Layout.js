import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavMenu from "./NavMenu";
import Sidebar from "./Sidebar";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

export default props => (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home">Freelance</Navbar.Brand>
      <Nav variant="pills" className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/counter">Counter</Nav.Link>
        <Nav.Link href="/fetchjobs">Jobs</Nav.Link>
      </Nav>
    </Navbar>
    <Container fluid>
      <Row>
        <Col sm={2} className="px-0">
          <NavMenu />
          {/* <Sidebar /> */}
        </Col>
        <Col sm={10}>{props.children}</Col>
      </Row>
    </Container>
  </>
);
