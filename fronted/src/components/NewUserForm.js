import React, { useState, useEffect } from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  register, updateUser } from '../actions/userActions';


const NewUserForm = ({editUser}) => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userList = useSelector(state => state.userList)
    const {  users } = userList

    const userRegister = useSelector(state => state.userRegister)
    const { success:successRegister } = userRegister

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault(); 

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
            <Form inline className='rtl' onSubmit={submitHandler}>
                <Form.Label htmlFor="inlineFormInputName2" srOnly>
                    Name
                </Form.Label>
                <Form.Control required
                    className="mb-2 mr-sm-2"
                    id="inlineFormInputName2"
                    placeholder="שם מלא"
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
                    Username
                </Form.Label>
                <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        id="inlineFormInputGroupUsername2" placeholder="מייל- שם משתמש" />
                </InputGroup>
                <Form.Label htmlFor="inlineFormInputpassWprf2" srOnly>
                    password
                </Form.Label>
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
                <Button type="submit" className="mb-2 mr-5">
                    עדכן משתמש
                 </Button>
            </Form>
        </>
    )
}

export default NewUserForm
