import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Navbars = () => {

  return (
   <>
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">Home</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">About</Nav.Link>
        <Nav.Link href="#features">Story</Nav.Link>
        <Nav.Link href="#pricing">Contact Us</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
   
   </>
  )
}
