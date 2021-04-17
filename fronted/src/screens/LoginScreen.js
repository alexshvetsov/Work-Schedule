import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import {Button,Typography,TextField} from '@material-ui/core';

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
            <Typography variant="h3" component="h2">
            התחבר
            </Typography>
                <h1></h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && < Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                    <Typography variant="h5" component="h4">
                    כתובת מייל
                    </Typography>
                    <TextField id="outlined-basic" label="הכנס כתובת אימייל" variant="outlined" value={email} onChange={(e) => { setEmail(e.target.value) }}style={{backgroundColor: 'white',width:'350px'}} />
                        
                    </Form.Group>
                    <Form.Group controlId='password'>
                    <Typography variant="h5" component="h4">
                    סיסמה 
                    </Typography>
                    <TextField id="outlined-basic" label='הכנס סיסמה' type='password' variant="outlined" value={password} onChange={(e) => { setPassword(e.target.value) }} style={{backgroundColor: 'white',width:'350px'}}/>    
                       
                    </Form.Group>
                    <Button onClick={submitHandler} variant="contained" color="primary">
                    התחבר
                    </Button>
                    
                </Form>
            </FormContainer>
        </div>
    )
}

export default LoginScreen
