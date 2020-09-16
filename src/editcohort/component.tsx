import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../rootReducer';
import { updateCohort, fetchCohorts } from '../cohorts/cohortSlice';



export default () => {
    const { id } = useParams();
    const cohortsById = useSelector((state: RootState) => state.cohorts.cohortsById);
    const isLoading = useSelector((state: RootState) => state.cohorts.isLoading);
    const cohort = cohortsById[id];
    const [ description, setDescription ] = useState<string>('')
    const [ moreInfoLink, setMoreInfoLink ] = useState<string>('')
    const [ denyText, setDenyText ] = useState<string>('')
    const [ acceptText, setAcceptText ] = useState<string>('')

    const dispatch = useDispatch();

    useEffect(() => {
        if (cohort === undefined) {
            dispatch(fetchCohorts())
        } else {
            setDescription(cohort.description)
            setAcceptText(cohort.acceptText)
            setDenyText(cohort.denyText)
            setMoreInfoLink(cohort.moreInfoLink)
        }
    }, [cohort, dispatch])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(updateCohort({ cohortID: id, description, moreInfoLink, denyText, acceptText }))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" defaultValue={description} />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="moreInfoLink">
                <Form.Label>Information Link</Form.Label>
                <Form.Control type="text" onChange={(e) => setMoreInfoLink(e.target.value)} defaultValue={moreInfoLink} placeholder="More information URL" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="acceptText">
                    <Form.Label>Accept Text</Form.Label>
                    <Form.Control onChange={(e) => setAcceptText(e.target.value)} defaultValue={acceptText} />
                </Form.Group>

                <Form.Group as={Col} controlId="denyText">
                    <Form.Label>Deny Text</Form.Label>
                    <Form.Control onChange={(e) => setDenyText(e.target.value)} defaultValue={denyText} />
                </Form.Group>
            </Form.Row>

            <Button disabled={isLoading} variant="primary" type="submit">
                Submit
        </Button>
        </Form>
    )
}