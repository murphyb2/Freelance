import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { IndexLinkContainer } from "react-router-bootstrap";

export default props => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Freelance</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <IndexLinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </IndexLinkContainer>
        </Nav.Item>
        <Nav.Item>
          <IndexLinkContainer to="/counter">
            <Nav.Link>Counter</Nav.Link>
          </IndexLinkContainer>
        </Nav.Item>
        <Nav.Item>
          <IndexLinkContainer to="/fetchjobs">
            <Nav.Link>Jobs</Nav.Link>
          </IndexLinkContainer>
        </Nav.Item>
      </Nav>
    </Container>
  </Navbar>
);
