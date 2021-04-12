import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form,  Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import {Button,Typography,TextField} from '@material-ui/core';

const RegisterScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [coniformPassword, setConiformPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== coniformPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    };


    return (
        <FormContainer>
            <Typography variant="h3" component="h2">
            SIGN UP
            </Typography>
            <br></br>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && < Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                <TextField id="outlined-basic" label="Enter name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} style={{backgroundColor:'white',width:'350px'}}/>
                    
                </Form.Group>
                <Form.Group controlId='email'>
                <TextField id="outlined-basic" label="Email Adress" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} style={{backgroundColor:'white',width:'350px'}}/>
                   
                </Form.Group>
                <Form.Group controlId='password'>
                <TextField id="outlined-basic" label="Your Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} style={{backgroundColor:'white',width:'350px'}}/>
                    
                </Form.Group>
                <Form.Group controlId='coniformPassword'>
                <TextField id="outlined-basic" label="Coniform Password" variant="outlined" value={coniformPassword} onChange={(e) => setConiformPassword(e.target.value)} style={{backgroundColor:'white',width:'350px'}}/>
                   
                </Form.Group>
                <Button variant="contained" color="primary" type='submit'>
                Register
                    </Button>
               
            </Form>
            <Row className="py-3">
            <Typography variant="h6" component="h7" style={{color:"black",marginLeft:'18px'}}>
            Already got a user? <Button variant="contained" color="primary" type='submit' style={{color:'white'}}>
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link> 
                    </Button>
            </Typography>
             
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
