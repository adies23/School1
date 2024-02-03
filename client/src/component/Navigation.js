import React from 'react';
import {Navbar, Nav, NavDropdown, Container, Button} from 'react-bootstrap';

import './Navigation.css';

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">School</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav /*activeKey={location.pathname}*/ className="me-auto">
          <Nav.Link className="nav-link" href="/general">General</Nav.Link>
          <Nav.Link className="nav-link" href="/createNewUser">Create New User</Nav.Link>
        </Nav>
        <Nav /*activeKey={location.pathname}*/ className="ms-auto"> 
          <NavDropdown title="Admin" id="basic-nav-dropdown">
            <NavDropdown.Item href="/adminPage">Admin Page</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
            <NavDropdown.Divider />
                    <Button variant="danger" className="logout-btn">
                      Logout 
                    </Button>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation