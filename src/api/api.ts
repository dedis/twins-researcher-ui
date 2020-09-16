import { Cohort } from '../cohorts/cohortSlice';
import { Participant } from '../participants/participantSlice';
import { backendURL } from './config';

export const getCohorts = async () => {
    const request = await fetch(`${backendURL}/1.0/cohort`);
    const response = await request.json();
    return response as Cohort[];
}

export const callUpdateCohort = async (data: any) => {
    await fetch(`${backendURL}/1.0/cohort`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data),
    })
}

export const getParticipants = async (cohortID: string) => {
    const request = await fetch(`${backendURL}/1.0/consent/${cohortID}`)
    const response = await request.json();
    return response as Participant[];
}

export const callShareInformation = async (id: string, did: string) => {
    await fetch(`${backendURL}/1.0/consent/${id}/${did}/share`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    })
}

export const callReencrypt = async (id: string, did: string) => {
    await fetch(`${backendURL}/1.0/consent/${id}/${did}/reencrypt`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    })
}