import React, { useEffect, useState } from 'react';
import { Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import NewUserForm from '../components/NewUserForm.js';
import DemoAlert from '../components/DemoAlert.js';
import {Button,Typography,TextField} from '@material-ui/core';

const UserEditScreen = ({ history }) => {

    const dispatch = useDispatch()

    const [editUser, setEditUser] = useState('')
    const [showDemoAlert, setShowDemoAlert] = useState(false)

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const userRegister = useSelector(state => state.userRegister)
    const { success: successRegister } = userRegister

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    const userUpdate = useSelector(state => state.userUpdate);
    const { success: successUpdate } = userUpdate;

    const theme = useSelector(state => state.theme);
    const { isDark } = theme;


    useEffect(() => {
        setEditUser('')
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, successUpdate, successDelete, successRegister])

    const deleteHandler = (id) => {
        if(userInfo.name ==='demo'){
            setShowDemoAlert(true)
            setTimeout(()=>setShowDemoAlert(false),5000)
            return
        }
        if (window.confirm('Are you sure ')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
        {showDemoAlert && <DemoAlert/>}
            <Typography className='user-form-header' variant="h3" component="h2">
                משתמשים
            </Typography>
            <NewUserForm editUser={editUser} />
            {
                (loading && users) ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Table className='right' striped bordered hover variant={isDark?'dark':'light'} responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th  style={{fontFamily:'sans-serif',fontSize:"30px"}}></th>
                                <th  style={{fontFamily:'sans-serif',fontSize:"30px"}}>מנהל</th>
                                <th style={{fontFamily:'sans-serif',fontSize:"30px"}}>מייל</th>
                                <th  style={{fontFamily:'sans-serif',fontSize:"30px"}}>שם</th>
                                <th  style={{fontFamily:'sans-serif',fontSize:"30px"}}>.מס</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map(user => (
                                <tr key={user._id}> 
                                    <td>
                                        <Button variant='light' className='btn-sm' onClick={() => setEditUser(editUser === user._id ? '' : user._id)}>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i> 
                                        </Button>
                                    </td>
                                    
                                    <td>{user.isAdmin ?
                                        (<i className='fas fa-check' style={{ color: 'green' }}></i>) :
                                        (<i className='fas fa-times' style={{ color: 'red' }}></i>)}
                                    </td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>

                                    <td>{user.name}</td>
                                    <td onClick={() => console.log(user._id)}>{users.findIndex(findUser => findUser.name === user.name) + 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                )
            }
        </>
    )
}

export default UserEditScreen
