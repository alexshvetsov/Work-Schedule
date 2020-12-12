import React from 'react';
import {Container,Col, Row} from 'react-bootstrap'

const FormContainer = ({children}) => {
    return (
        <Container style={{'margin-top':'20%'}}>  
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children} 
                </Col>
            </Row>
        </Container> 
    )
}

export default FormContainer 
