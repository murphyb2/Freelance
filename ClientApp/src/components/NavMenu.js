import React from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "./NavMenu.css";

// <Navbar /* fixed="top" */ collapseOnSelect={true} bg="light">
export default props => (
  <Navbar
    className="flex-column"
    bg="dark"
    variant="dark"
    collapseOnSelect={true}
    expand="xl"
  >
    {/* <Nav.Link to="/">Freelance</Nav.Link> */}
    <Navbar.Brand href="/">Freelance</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav defaultActiveKey="/" className="flex-column mx-auto">
        <Nav.Item>
          <Link to="/">Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/counter">Counter</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/fetchjobs">Jobs</Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
