import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "./Sidebar.css";

export default props => (
  <>
    <Container fluid className="sidebar-container">
      <Jumbotron>
        <h1>Freelance</h1>
      </Jumbotron>
      <Nav defaultActiveKey="/home" className="flex-column">
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
    </Container>
    {/* <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Freelance</h3>
        </div>

        <ul className="list-unstyled components">
          <li className="active">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Home
            </a>
          </li>
          <Link to="/Home" />
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a
              href="#pageSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Pages
            </a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <a href="#">Page 1</a>
              </li>
              <li>
                <a href="#">Page 2</a>
              </li>
              <li>
                <a href="#">Page 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
    <div id="content">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button type="button" id="sidebarCollapse" className="btn btn-info">
            <i className="fas fa-align-left"></i>
            <span>Toggle Sidebar</span>
          </button>
        </div>
      </nav>
    </div> */}
  </>
);
