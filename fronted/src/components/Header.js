import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import Sidebar from './Sidebar.js';
import {
    Navbar, Nav, Container,
} from 'react-bootstrap';
import {Button,Typography,TextField} from '@material-ui/core';
import ThemeModeButton from './ThemeModeButton';

const Header = () => {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const theme = useSelector(state => state.theme);
    const { isDark } = theme;

    const dispatch = useDispatch()

  

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header className={`header ${isDark?'':'light-header'}`}>
            <Navbar className={`header ${isDark?'':'light-header'}`}   >
                        <ThemeModeButton/>
                        <img className='header-img' src={'/logo2.png'}/>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand ></Navbar.Brand> 
                    </LinkContainer>

                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                        <Nav className="ml-auto">
                            {userInfo && (
                                 <Button variant="contained" color="primary" >
                                 התנתק
                                 </Button>
                               
                            )}

                            {userInfo && (<Navbar.Text  className='mr-2' style={{ 'display': 'flex' }}>
                                <span style={{ 'margin': 'auto' }}> {userInfo.name}</span>
                            </Navbar.Text>
                            )}

                            {!userInfo && <LinkContainer to='/login'>
                                <Nav.Link > <Button variant="contained" color="primary" >
                                
                                 התחבר
                                 <i className='fas fa-user pl-2'></i> </Button></Nav.Link>
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
