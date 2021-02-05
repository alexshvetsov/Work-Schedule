import React from 'react'
import TeamMaker from '../components/TeamMaker'
import { Col, Row,Container } from 'react-bootstrap'
import ShiftsMaker from '../components/ShiftsMaker'
import ShiftsCount from '../components/ShiftsCount.js';
import { AllOptions } from '../components/AllOptions';

const ShiftsPanelScreen = () => {
    return (<>
        <Container fluid>
        <AllOptions/>

            <Row>
                <Col xs='2'>
                    <TeamMaker />
                     <ShiftsCount/>   
                </Col> 
                <Col xs='10'>
                    <ShiftsMaker /> 
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default ShiftsPanelScreen
