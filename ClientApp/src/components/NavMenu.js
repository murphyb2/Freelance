import React from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
// import "./NavMenu.css";

// <Navbar /* fixed="top" */ collapseOnSelect={true} bg="light">
export default props => (
  <Navbar className="flex-column" collapseOnSelect={true}>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse
      id="responsive-navbar-nav"
      className="justify-content-center"
    >
      {/* <Nav defaultActiveKey="/" variant="pills" className="flex-column mx-auto"> */}
      <Nav className="flex-column">
        <NavLink to="/">
          <Nav.Item>
            <Button className="m-3" active block variant="dark">
              Home
            </Button>
          </Nav.Item>
        </NavLink>
        <NavLink to="/counter">
          <Nav.Item>
            <Button className="m-3" active block variant="dark">
              Counter
            </Button>
          </Nav.Item>
        </NavLink>
        <NavLink to="/fetchjobs">
          <Nav.Item>
            <Button className="m-3" active block variant="dark">
              Jobs
            </Button>
          </Nav.Item>
        </NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
