import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default () => (
    <Form>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" />
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
            <Form.Label>Information Link</Form.Label>
            <Form.Control type="text" placeholder="More information URL" />
        </Form.Group>

        <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Accept Text</Form.Label>
                <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Deny Text</Form.Label>
                <Form.Control />
            </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
)