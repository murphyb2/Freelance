import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { IndexLinkContainer } from "react-router-bootstrap";
import { NavDropdown } from "react-bootstrap";

export default (props) => (
  <Navbar
    collapseOnSelect
    expand="xl"
    expanded={false}
    bg="dark"
    variant="dark"
  >
    <Container>
      <Navbar.Brand href="/">Freelance</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <IndexLinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </IndexLinkContainer>
          </Nav.Item>
          <Nav.Item>
            <IndexLinkContainer to="/jobs">
              <Nav.Link>Jobs</Nav.Link>
            </IndexLinkContainer>
          </Nav.Item>
        </Nav>
        <Form inline className="justify-content-end">
          <FormControl
            type="text"
            placeholder="Username"
            className=" mr-sm-2"
          />
          <FormControl
            type="text"
            placeholder="Password"
            className=" mr-sm-2"
          />
          <Button>Login</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
