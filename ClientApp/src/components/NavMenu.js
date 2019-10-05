import React from 'react';
//import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//import Nav from 'react-bootstrap';
//import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
    <Navbar fixed="top" collapseOnSelect={true}>
        <Navbar.Brand>
          <Nav.Link to="/">Freelance</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav>
                <Nav.Item>
                  <Nav.Link href="/">
                    Home
                  </Nav.Link>
                </Nav.Item>
        
                <Nav.Item>
                  <Nav.Link to="/counter">
                    Counter
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link to="/fetchjobs">
                    Jobs
                  </Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar> 
);
