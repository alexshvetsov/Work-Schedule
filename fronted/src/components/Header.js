import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import Sidebar from './Sidebar.js';


import {
    Navbar, Nav, Container,
} from 'react-bootstrap'

const Header = () => {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="primary" variant="dark" collapseOnSelect expand="lg" className='header'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >Work-Schedule</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                        <Nav className="ml-auto">
                            {userInfo && (
                                <Button variant="danger" size="sm" onClick={logoutHandler} className='mr-3'>התנתק</Button>
                            )}

                            {userInfo && (<Navbar.Text style={{ 'display': 'flex' }}>
                                <span style={{ 'margin': 'auto' }}> {userInfo.name}</span>
                            </Navbar.Text>
                            )}

                            {!userInfo && <LinkContainer to='/login'>
                                <Nav.Link >התחבר<i className='fas fa-user pl-2'></i></Nav.Link>
                            </LinkContainer>}

                        </Nav>

                    {/* </Navbar.Collapse> */}
                </Container>
                <Sidebar />

            </Navbar >
        </header >
    )
}

export default Header
