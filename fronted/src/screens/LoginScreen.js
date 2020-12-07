import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <FormContainer>
                <h1>Sign In</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control type='email'
                            placeholder='Enter Email'
                            value={email} onChange={(e) => { setEmail(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Your Password</Form.Label>
                        <Form.Control type='password'
                            placeholder='Enter password'
                            value={password} onChange={(e) => { setPassword(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' varient='primary'>Sign In</Button>
                </Form>
                <Row className='py-3'>
                    <Col>New Customer? <Link to='/register'>Register</Link></Col>
                </Row>
            </FormContainer>
        </div>
    )
}

export default LoginScreen
