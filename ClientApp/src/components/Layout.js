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

import { Link, NavLink } from "react-router-dom";

export default props => (
  <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Freelance</Navbar.Brand>
        <Nav variant="pills" className="mr-auto">
          {/* <Nav.Link href="/home">Home</Nav.Link> */}
          <NavLink to="/">
            <Nav.Item>
              <Button className="m-3" active block variant="dark">
                Home
              </Button>
            </Nav.Item>
          </NavLink>
          {/* <Nav.Link href="/counter">Counter</Nav.Link> */}
          <NavLink to="/counter">
            <Nav.Item>
              <Button className="m-3" active block variant="dark">
                Counter
              </Button>
            </Nav.Item>
          </NavLink>
          {/* <Nav.Link href="/fetchjobs">Jobs</Nav.Link> */}
          <NavLink to="/fetchjobs">
            <Nav.Item>
              <Button className="m-3" active block variant="dark">
                Jobs
              </Button>
            </Nav.Item>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
    <Container>
      {/* <Row> */}
      <Col sm={10}>{props.children}</Col>
      {/* </Row> */}
    </Container>
  </>
);
