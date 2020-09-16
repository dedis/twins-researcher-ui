import React from 'react';
import Table from 'react-bootstrap/Table'

export default () => (
    <Table bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>DID</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>did:sov:abcd</td>
                <td>Consent Granted</td>
                <td>Decrypt</td>
            </tr>
            <tr>
                <td>1</td>
                <td>did:sov:abcd</td>
                <td>Consent Granted</td>
                <td>Decrypt</td>
            </tr>
        </tbody>
    </Table>
)
