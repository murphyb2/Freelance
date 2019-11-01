import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

export default props => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Freelance</Navbar.Brand>
      <Nav variant="pills" className="mr-auto">
        <Nav.Item>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/counter">
            <Nav.Link>Counter</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/fetchjobs">
            <Nav.Link>Jobs</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </Container>
  </Navbar>
);
