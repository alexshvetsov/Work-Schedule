import React, { useState } from 'react';
import { useSelector } from 'react-redux';


import { Nav, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {
    const [show, setShow] = useState(false)
    const [url, setUrl] = useState('none')


    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <>
            <Button size="sm" className='toggle-sidebar d-none d-sm-block' variant='outline-success' onClick={() => { setShow(!show) }}>☰</Button>
            <div className={`hide-nav ${show ? ' ' : 'd-none '}`} onClick={() => { setShow(!show) }}></div>
            <Nav className={`sidebar d-none d-sm-block color-light rtl ${show ? '' : 'hide'}`}
                onClick={() => { setShow(!show) }}
                active-sidebarkey="/home"
                onSelect={selectedKey => setUrl(selectedKey)}
            >

                <div className={`sidebar-sticky rtl ${show ? '' : 'hide'}`}></div>
                <Nav.Item className={url === '/' ? 'active-sidebar' : ''}>
                    <LinkContainer to='/'>
                        <Nav.Link className='link' > דף הבית</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item className={url === '/myshifts' ? 'active-sidebar' : ''}>
                    <LinkContainer to={userInfo ? '/myshifts' : '/login?redirect=myshifts'}>
                        <Nav.Link className='link' > המשמרות שלי</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item className={url === '/submitshifts' ? 'active-sidebar' : ''}>
                    <LinkContainer to={userInfo ? '/submitshifts' : '/login?redirect=submitshifts'}>
                        <Nav.Link className='link' > הגש משמרות</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                {(userInfo && userInfo.isAdmin) ? <Nav.Link className='right green'>פאנל ניהול</Nav.Link> : ''}
                {(userInfo && userInfo.isAdmin) ?
                    < >
                        <Nav.Item className={url === '/admin/shifts' ? 'active-sidebar' : ''}>
                            <LinkContainer to={'/admin/shifts'}>
                                <Nav.Link className='link' > הכן סידור</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className={url === '/workers' ? 'active-sidebar' : ''}>
                            <LinkContainer to={'/workers'}>
                                <Nav.Link className='link' > עובדים</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </>
                    : ''}
            </Nav>


        </>
    )
}

export default Sidebar
