import React, { useState, useEffect } from 'react'
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  register, updateUser } from '../actions/userActions';
import DemoAlert from '../components/DemoAlert.js';
import {Button,Typography,TextField} from '@material-ui/core';


const NewUserForm = ({editUser}) => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [showDemoAlert, setShowDemoAlert] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const {  users } = userList

    const userRegister = useSelector(state => state.userRegister)
    const { success:successRegister } = userRegister

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault(); 
        if(userInfo.name ==='demo'){
            setShowDemoAlert(true)
            setTimeout(()=>setShowDemoAlert(false),5000)
            return
        }
        if(!editUser){
            dispatch(register(name, email, password, isAdmin))

        }else{
            dispatch(updateUser({ _id: editUser, name, email, isAdmin }))


        }

    };

    useEffect(() => {
        if(editUser){
            const user = users.filter(user=>user._id===editUser)[0]
            setEmail(user.email)
            setName(user.name)
            setIsAdmin(user.isAdmin)
        }else{
            setEmail('')
            setPassword('')
            setName('')
            setIsAdmin(false)
        }
    }, [dispatch,successRegister,editUser,users])


    return (
        <>
        {showDemoAlert && <DemoAlert/>}

            <Form inline className='rtl' onSubmit={submitHandler}>
            <Typography variant="h3" component="h2">
            Name
            </Typography>
                
                <Form.Control required
                    className="mb-2 mr-sm-2"
                    id="inlineFormInputName2"
                    placeholder="שם מלא"
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <Typography variant="h3" component="h2">
                Username
            </Typography>
               
                <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        id="inlineFormInputGroupUsername2" placeholder="מייל- שם משתמש" />
                </InputGroup>
                <Typography variant="h3" component="h2">
                password
            </Typography>
             
                <Form.Control required
                    className="mb-2 mr-sm-2"
                    id="inlineFormInputpassWprf2"
                    placeholder="סיסמה"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    disabled={editUser}
                />
                <Form.Check
                    type="checkbox"
                    className="mb-2 mr-sm-2"
                    id="inlineFormCheck"
                    label="מנהל"
                    checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}
                />
                 <Button variant="contained" color="primary">
                 עדכן משתמש
                    </Button>
               
            </Form>
        </>
    )
}

export default NewUserForm
