import React from 'react';
import {Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

import {
    Navbar, Nav, Container, NavDropdown,
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
            <Navbar bg="primary" variant="dark" collapseOnSelect expand="lg">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >Work-Schedule</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {userInfo && (
                                <Button  variant="danger" size="sm" onClick={logoutHandler} className='mr-3'>התנתק</Button>
                            )}
                            {userInfo && (<Navbar.Text>
                            { userInfo.name}
                            </Navbar.Text>
                            )}
                            {!userInfo && <LinkContainer to='/login'>
                                <Nav.Link ><i className='fas fa-user pr-2'></i>Sign in</Nav.Link>
                            </LinkContainer>}
                            {!userInfo && <LinkContainer to='/register'>
                                <Nav.Link ><i className='fas fa-user pr-2'></i>Register</Nav.Link>
                            </LinkContainer>}
                        </Nav>

                    </Navbar.Collapse>
                </Container>

            </Navbar >
        </header >
    )
}

export default Header
