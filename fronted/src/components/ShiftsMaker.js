import React, { useState } from 'react'
import { Table, Row, Modal, Button, Form } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import uuid from 'react-uuid'
import { updateDateDaysAction } from '../actions/dateDaysActions';

const ShiftsMaker = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [startDate, setStartDate] = useState(new Date());
    const [daysAmount, setDaysAmount] = useState(0);

    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    const setDay = (dayNumber) => {
        const dayWord = new Date(Number(year), Number(month), Number(dayNumber)).getDay()
        return days[dayWord]
    }

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const sumbitForm=(e)=>{ 
        e.preventDefault() 
       dispatch(updateDateDaysAction({startDate,daysAmount})) 
        handleClose() 
    }
    const shifts = [1,1,1,1,11,1]
    return (
        <>
            <Row style={{ 'direction': 'rtl' }}>
                <Button variant="success" className="my-3" onClick={handleShow}>
                    Launch demo modal
                 </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='startDate'>
                                <Form.Label>בחר תאריך</Form.Label>
                                <Form.Control type='date'
                                    
                                   value={startDate} onChange={(e) => setStartDate(e.target.value)}>
                               </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='daysAmount'>
                                <Form.Label>בחר כמות ימים</Form.Label>
                                <Form.Control type='number' 
                                   
                                    value={daysAmount} onChange={(e) => setDaysAmount(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={(e)=>sumbitForm(e)}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>רענון</th>
                        <th>משמרת לילה 22:00-6:00</th>
                        <th>משמרת צהריים 14:00-22:00</th>
                        <th>משמרת בוקר 06:00-14:00:00</th>
                        <th>תאריך</th>
                        <th>יום בשבוע</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td className='shiftTD'>
                            <p>אחמ"ש</p>
                            <p>מאבטח 2</p>
                        </td>
                        <td className='shiftTD'>
                            <p>אחמ"ש</p>
                            <p>מאבטח 2</p>
                        </td>
                        <td className='shiftTD'>
                            <p>אחמ"ש</p>
                            <p>מאבטח 2</p>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    {
                        shifts.map((day, index) => (
                            <tr key={uuid()}>
                                <td>
                                </td>
                                <td className='shiftTD'>

                                </td>
                                <td className='shiftTD'>

                                </td>
                                <td className='shiftTD'>

                                </td>
                                <th>{`${index + 1}/${month + 1}/${year}`}</th>
                                <th>{setDay(index + 1)}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </>

    )
}

export default ShiftsMaker
