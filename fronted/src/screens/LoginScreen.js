import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ history, location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    const redirect = location.search ? location.search.split('=')[1] : '/';


    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    return (
        <div className='rtl right'>
            <FormContainer className='rtl right'>
                <h1>התחבר</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && < Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>כתובת מייל</Form.Label>
                        <Form.Control type='email'
                            placeholder='הכנס כתובת אימייל'
                            value={email} onChange={(e) => { setEmail(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>סיסמה</Form.Label>
                        <Form.Control type='password'
                            placeholder='הכנס סיסמה'
                            value={password} onChange={(e) => { setPassword(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' varient='primary'>התבחר</Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default LoginScreen
