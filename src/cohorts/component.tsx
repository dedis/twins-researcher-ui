import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

export default function Component() {
    return (
        <Row style={{ justifyContent: 'space-between' }}>
          <Card className="mb-3">
            <Card.Header>Cohort ID</Card.Header>
            <Card.Body>
              <Card.Text>
                Synopsis
              </Card.Text>
              <Button variant="info">More information</Button>
              <Button className="ml-3" variant="primary">View Participants</Button>
            </Card.Body>
          </Card>
        </Row>
    )
}