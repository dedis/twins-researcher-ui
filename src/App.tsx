import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import Participants from './participants/component'

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <NavbarBrand href="#">DEDIS Pharma</NavbarBrand>
      </Navbar>
      <Container style={{ marginTop: 20 }}>
        <Participants></Participants>
      </Container>
    </>
  );
}

export default App;
