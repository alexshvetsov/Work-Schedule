import React, { useState, useEffect } from 'react'
import { Form, Modal,  ListGroup } from 'react-bootstrap'
import uuid from 'react-uuid'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_WORKER_TEAMS } from '../constants/workerTeamsConstants.js'
import { listUsers } from '../actions/userActions.js';
import {Button,Typography,TextField} from '@material-ui/core';
const TeamMaker = () => {
    const [show, setShow] = useState(false);
    const [teamSize, setTeamSize] = useState(0)
    let teamsArray = []

    const dispatch = useDispatch()

    const workersArray = ['אלי סבג', 'שי שלום', 'שי כהן', 'רומן יונטל', 'אלכס שווצוב', 'יואל רומר', 'דניאל אלון', 'גון אניק', 'יגאל לוי']

    const userList = useSelector(state => state.userList)
    const { users } = userList

    const getAllSubmittedShiftsByDate = useSelector(state => state.getAllSubmittedShiftsByDate)
    const { submittedShiftsByDate } = getAllSubmittedShiftsByDate


    let mutableWorkersArray = [...workersArray]
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateMutableWorkersArray = (e, teamIndex, inTeamIndex) => {
        if (teamsArray.findIndex(team => team.teamIndex === teamIndex && team.inTeamIndex === inTeamIndex) !== -1) {
            teamsArray[teamsArray.findIndex(team => team.teamIndex === teamIndex && team.inTeamIndex === inTeamIndex)].name = e.target.value
        } else {
            teamsArray.push({ teamIndex, inTeamIndex, name: e.target.value })
        }
    }

    const saveTeams = () => {
        dispatch({ type: UPDATE_WORKER_TEAMS, payload: teamsArray })
    }




    useEffect(() => { 
        if (users && users.length === 0) {
            dispatch(listUsers())
        }
    }, [dispatch,users])

    return (
        <>
            <Button className='my-3' variant="primary" onClick={handleShow}>
                צוות עובדים
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Typography variant="h3" component="h2">
                Modal heading
            </Typography>
                  
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId='teamSize'>
                        <Typography variant="h5" component="h5">
                        Team Size
            </Typography>
                        
                        <Form.Control type='number' placeholder='0' value={teamSize} onChange={(e) => setTeamSize(e.target.value)} />
                    </Form.Group>
                    {[...Array(Number(teamSize))].map((e, index) => (<div key={uuid()}>
                      
                        <Typography variant="h6" component="h6">
                        Team {index + 1}
            </Typography>
                        
                        {
                            [...Array(Math.floor(Number(workersArray.length) / Number(teamSize)))].map((e, index1) => (
                                <Form.Control key={uuid()} className='rtl' as='select' defaultValue={'בחר עובד'} onChange={(e) => updateMutableWorkersArray(e, index, index1)} >
                                    <option value={'בחר עובד'} onChange={(e) => updateMutableWorkersArray(e, index)}>{'בחר עובד'} </option>
                                    {mutableWorkersArray.map((worker) => <option key={worker} value={worker} >{worker} </option>)}
                                </Form.Control>
                            ))
                        }
                    </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="contained" color="primary" onClick={handleClose}>
                Close
                    </Button>
                    <Button variant="contained" color="primary" onClick={saveTeams}>
                Close
                    </Button>   
                 
                </Modal.Footer>
            </Modal>

            <ListGroup className='color-dark' >
                <ListGroup.Item variant="success">הגישו משמרות</ListGroup.Item>
                {(users && submittedShiftsByDate) &&
                    submittedShiftsByDate.options[0][1].map(worker =>
                        <ListGroup.Item key={uuid()}>{worker[0]}</ListGroup.Item>)
                }
                <ListGroup.Item variant='danger'>לא הגישו משמרות</ListGroup.Item>
                {(users && submittedShiftsByDate) &&
                    users.map(user => submittedShiftsByDate.submitted.findIndex(worker => worker === user.name) > -1 ? null : <ListGroup.Item key={uuid()}>{user.name}</ListGroup.Item>
                    )}
            </ListGroup>
        </>
    )
}

export default TeamMaker
