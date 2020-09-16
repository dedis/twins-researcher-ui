import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import Participants from './participants/component'
import Cohorts from './cohorts/component';
import EditCohort from './editcohort/component';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <NavbarBrand href="/">DEDIS Pharma</NavbarBrand>
      </Navbar>
      <Container style={{ marginTop: 20 }}>
        <Switch>
          <Route exact path="/">
            <Cohorts></Cohorts>
          </Route>
          <Route exact path="/cohort/:id/participants">
            <Participants></Participants>
          </Route>
          <Route path="/cohort/:id">
            <EditCohort></EditCohort>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
