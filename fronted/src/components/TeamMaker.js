import React, { useState,useEffect } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import { useDispatch } from 'react-redux';
import {UPDATE_WORKER_TEAMS} from '../constants/workerTeamsConstants.js'


const TeamMaker = () => {
    const [show, setShow] = useState(false);
    const [teamSize, setTeamSize] = useState(0)
    let teamsArray =[]

     const dispatch = useDispatch()

    const workersArray = ['אלי סבג', 'שי שלום', 'שי כהן', 'רומן יונטל', 'אלכס שווצוב', 'יואל רומר', 'דניאל אלון', 'גון אניק', 'יגאל לוי']
    
    let mutableWorkersArray = [...workersArray]
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateMutableWorkersArray = (e, teamIndex, inTeamIndex) => {
        if(teamsArray.findIndex(team=>team.teamIndex== teamIndex && team.inTeamIndex== inTeamIndex) !=-1){
            teamsArray[teamsArray.findIndex(team=>team.teamIndex== teamIndex && team.inTeamIndex== inTeamIndex)].name=e.target.value
        }else{
            teamsArray.push({teamIndex, inTeamIndex, name:e.target.value})
        }
    }

    const saveTeams=()=>{
        console.log(teamsArray);
        dispatch({type:UPDATE_WORKER_TEAMS, payload:teamsArray})
    }

    return (
        <>
            <Button className='my-3' variant="primary" onClick={handleShow}>
                צוות עובדים
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId='teamSize'>
                        <Form.Label>Team Size</Form.Label>
                        <Form.Control type='number' placeholder='0' value={teamSize} onChange={(e) => setTeamSize(e.target.value)} />
                    </Form.Group>
                    {[...Array(Number(teamSize))].map((e, index) => (<div key={uuid()}>
                        <p>Team {index + 1}</p>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveTeams}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {workersArray.map(worker => (<p key={worker}>{worker}</p>))}
        </>
    )
}

export default TeamMaker
