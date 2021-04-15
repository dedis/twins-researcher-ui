import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../rootReducer'
import { Participant, fetchParticipants, share, reencrypt } from './participantSlice'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { backendURL } from '../api/config';

const statusName: Record<number, string> = {
    0: 'Information Requested',
    1: 'Information Provided',
    2: 'Consent Granted',
    3: 'Consent Denied',
    4: 'Decrypted',
    5: 'Decryption Failure'
}


export default () => {
    const { id } = useParams();
    const participants = useSelector((state: RootState) => state.participants.participants)
    const cohortSize = useSelector((state: RootState) => state.cohorts.cohortsById[id].size)
    const isLoading = useSelector((state: RootState) => state.participants.isLoading)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchParticipants(id))
    }, [id, dispatch])

    const Single = (props: any) => {
        const data = props.data as Participant;
        return (
            <tr>
                <td>{data.did}</td>
                <td>{statusName[data.status]}</td>
                <td>{actionFromStatus(data.did, data.status, isLoading)}</td>
            </tr>
        )
    }

    const onshare = (did: string) => {
        dispatch(share(id, did))
    }

    const ondecrypt = (did: string) => {
        dispatch(reencrypt(id, did))
    }

    const download = (did: string) => {
        window.open(`${backendURL}/1.0/consent/${id}/${did}/download`, '_blank')
    }

    const actionFromStatus = (did: string, status: number, disabled: boolean) => {
        switch (status) {
            case 0:
                return <Button disabled={disabled} onClick={() => onshare(did)}>Share information</Button>
            case 1:
                return <Button disabled={true}>Information shared</Button>
            case 2:
                return <Button disabled={disabled} onClick={() => ondecrypt(did)}>Decrypt</Button>
            case 3:
                return <Button disabled={true}>Consent Denied</Button>
            case 4:
                return <Button onClick={() => download(did)}>Download</Button>
        }
    }

    return (
        <div>
            <p>Sent an invite to <b>{cohortSize}</b> members. Received a reply from <b>{participants.length}</b> members</p>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>DID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map(participant => <Single data={participant}></Single>)}
                </tbody>
            </Table>
        </div>
    )
}
