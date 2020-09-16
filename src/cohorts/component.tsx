import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { fetchCohorts, Cohort } from './cohortSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';

const Single = (props: any) => {
    const data = props.data as Cohort;
    return (
          <Card className="mb-3">
            <Card.Header>Cohort ID {data.cohortID}</Card.Header>
            <Card.Body>
              <Card.Text>
                {data.synopsis}
              </Card.Text>
              <Link to={`/cohort/${data.cohortID}`}><Button variant="info">More information</Button></Link>
              <Link to={`/cohort/${data.cohortID}/participants`}><Button className="ml-3" variant="primary">View Participants</Button></Link>
            </Card.Body>
          </Card>
    )
}

export default () => {
    const dispatch = useDispatch();
    const cohorts = useSelector((state: RootState) => state.cohorts.cohorts )

    useEffect(() => {
        dispatch(fetchCohorts());
    }, [dispatch])

    return (
        <Row style={{ justifyContent: 'space-between' }}>
            {cohorts.map(cohort => <Single key={cohort.cohortID} data={cohort}></Single>)}
        </Row>
    )
}