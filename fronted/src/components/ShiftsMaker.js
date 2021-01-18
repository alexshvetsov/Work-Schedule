import React, { useState, useEffect } from 'react'
import { Table, Row, Modal, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import uuid from 'react-uuid'
import { updateDateDaysAction, getDateDaysAction } from '../actions/dateDaysActions';
import { postScheduleAction, updateScheduleAction, postTemporaryScheduleAction, updateTemporaryScheduleAction } from '../actions/scheduleActions';
import { UPDATE_TEMP_SHIFTS_ARRAY } from '../constants/scheduleConstants';

const ShiftsMaker = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const userLogin = useSelector(state => state.userLogin);
    // const { userInfo } = userLogin;

    const getAllSubmittedShiftsByDate = useSelector(state => state.getAllSubmittedShiftsByDate)
    const { submittedShiftsByDate } = getAllSubmittedShiftsByDate

    const [startDate, setStartDate] = useState(new Date());
    const [daysAmount, setDaysAmount] = useState(0);

    const shiftsDateDays = useSelector(state => state.shiftsDateDays)
    const { date: dateState, daysAmount: daysAmountState } = shiftsDateDays

    const getInProgressSchedule = useSelector(state => state.getInProgressSchedule)
    const { schedule } = getInProgressSchedule




    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']


    const [shifts, setShifts] = useState([])
    const [disableSaveButton, setDisableSaveButton] = useState(false)

    const setWorker = (worker, day, shift, index) => {
        let tempShifts = [...shifts]
        worker !== 'worker' ? tempShifts[day][shift][index] = worker : tempShifts[day][shift][index] = ''
        setShifts(tempShifts)
        dispatch({ type: UPDATE_TEMP_SHIFTS_ARRAY, payload: tempShifts })
    }

    const setDay = (dayNumber) => {
        const dayWord = new Date(Number(dateState.getFullYear()), Number(dateState.getMonth()), Number(dayNumber)).getDay()
        return days[dayWord]
    }

    const setOptions = (day, shift) => {
        let options = []
        for (let i = 0; i < submittedShiftsByDate.options[day][1].length; i++) {
            if (submittedShiftsByDate.options[day][1][i][1].includes(shift) || submittedShiftsByDate.options[day][1][i][1] === 'הכול') {
                options.push(submittedShiftsByDate.options[day][1][i][0])
            }
        }
        return options
    }

    const setOptionsTraining = () => {
        let options = []
        for (let i = 0; i < submittedShiftsByDate.options[0][1].length; i++) {
            options.push(submittedShiftsByDate.options[0][1][i][0])
        }
        return options
    }

    const trainingsHandler = (worker, day) => {
        let tempShifts = [...shifts]
        tempShifts[day].trainings.findIndex(workerArray => workerArray === worker) > -1 ?
            tempShifts[day].trainings.splice(tempShifts[day].trainings.findIndex(workerArray => workerArray === worker), 1)
            : tempShifts[day].trainings.push(worker)
        setShifts(tempShifts)
    }

    const sumbitForm = (e) => {
        e.preventDefault()
        dispatch(updateDateDaysAction({ startDate, daysAmount }))
        handleClose()
    }


    useEffect(() => {
        if(schedule && schedule.done){
            setDisableSaveButton(true) 

        }
        if (schedule && schedule.shifts) {
            setShifts(schedule.shifts)


        } else {
            let shiftsArray = []
            for (let i = 0; i < daysAmountState; i++) {
                shiftsArray.push({
                    morning: [],
                    afternoon: [],
                    evening: [],
                    trainings: []
                })
            }
            setShifts(shiftsArray)
        }
        if (!daysAmountState) {
            dispatch(getDateDaysAction())
        }
    }, [dispatch, daysAmountState, shifts.length, dateState, schedule])

    const postDoneSchedule = () => {
        if (!schedule || !schedule._id) {
            dispatch(postScheduleAction({ shifts, dateState }))
            setDisableSaveButton(true) 
        } else {
            setDisableSaveButton(true) 
            dispatch(updateScheduleAction(shifts, schedule._id))
        }
    }

    const postTemporarySchedule = () => {
        if (!schedule) {
            dispatch(postTemporaryScheduleAction({ shifts, dateState }))
        } else {
            dispatch(updateTemporaryScheduleAction(shifts, dateState))
        }

    }

    return (
        <>
            <Row style={{ 'direction': 'rtl' }}>
                <Button variant="success" className="my-3" onClick={handleShow}>
                    עדכן ימים ותאריך להכנת סידור עבודה
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
                        <Button variant="primary" onClick={(e) => sumbitForm(e)}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                {daysAmountState && <h4 className='my-3 mr-3 align-self'>הכנת סידור עבודה לתאריכים&nbsp;
                    {`${new Date(dateState).getDate()}/${new Date(dateState).getMonth() + 1}`} - {`${new Date(dateState).getDate() + daysAmountState - 1}/${new Date(dateState).getMonth() + 1}`}
                </h4>}
            </Row>
            {dateState && <Table striped bordered hover responsive className='table-sm'>
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
                    {submittedShiftsByDate && shifts.length > 0 &&
                        submittedShiftsByDate.options.map((option, index) => (

                            <tr key={uuid()}>
                                <td>

                                    <DropdownButton id="dropdown-basic-button" title="בחר עובדים ">
                                        {setOptionsTraining().map((worker) => (
                                            <Dropdown.Item key={'checkbox' + index + worker}>
                                                <p className='py-1 center'
                                                    style={{ 'backgroundColor': shifts[index].trainings.findIndex(workerArray => workerArray === worker) > -1 ? 'green' : null }}
                                                    onClick={(e) => { trainingsHandler(worker, index) }}>{worker}</p>
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </td>
                                <td className='shiftTD'>
                                    <Form.Control className='rtl' as='select' defaultValue={shifts[index].evening[0] || 'worker'} onChange={(e) => setWorker(e.target.value, index, 'evening', 0)}>
                                        <option value={'worker'}>בחר עובד </option>
                                        {setOptions(index, 'לילה').map((worker) => <option key={'evening' + worker} value={worker}>{worker} </option>)}
                                    </Form.Control>
                                    <Form.Control className='rtl' as='select' defaultValue={shifts[index].evening[1] || 'worker'} onChange={(e) => setWorker(e.target.value, index, 'evening', 1)}>
                                        <option value={'worker'}>בחר עובד </option>
                                        {setOptions(index, 'לילה').map((worker) => <option key={index + 'evening' + worker} value={worker}>{worker} </option>)}
                                    </Form.Control>
                                </td>
                                <td className='shiftTD'>
                                    <Form.Control className='rtl' as='select' defaultValue={shifts[index].afternoon[0] || 'worker'} onChange={(e) => setWorker(e.target.value, index, 'afternoon', 0)}>
                                        <option value={'worker'}>בחר עובד </option>
                                        {setOptions(index, 'צהריים').map((worker) => <option key={'afternoon' + worker} value={worker}>{worker} </option>)}
                                    </Form.Control>
                                    <Form.Control className='rtl' as='select' defaultValue={shifts[index].afternoon[1] || 'worker'} onChange={(e) => setWorker(e.target.value, index, 'afternoon', 1)}>
                                        <option value={'worker'}>בחר עובד </option>
                                        {setOptions(index, 'צהריים').map((worker) => <option key={index + 'afternoon' + worker} value={worker}>{worker} </option>)}
                                    </Form.Control>
                                </td>
                                <td className='shiftTD'>
                                    <Form.Control className='rtl' as='select' defaultValue={shifts[index].morning[0] || 'worker'} onChange={(e) => setWorker(e.target.value, index, 'morning', 0)}>
                                        <option value={'worker'}>בחר עובד </option>
                                        {setOptions(index, 'בוקר').map((worker) => <option key={'morning' + worker} value={worker}>{worker} </option>)}
                                    </Form.Control>
                                    <Form.Control className='rtl' as='select' defaultValue={shifts[index].morning[1] || 'worker'} onChange={(e) => setWorker(e.target.value, index, 'morning', 1)}>
                                        <option value={'worker'}>בחר עובד </option>
                                        {setOptions(index, 'בוקר').map((worker) => <option key={index + 'morning' + worker} value={worker}>{worker} </option>)}
                                    </Form.Control>
                                </td>
                                <th>{`${new Date(dateState).getDate() + index}/${new Date(dateState).getMonth() + 1}`}</th>
                                <th>{setDay(index + 1)}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            }

            <Button variant="success" className="mr-3" onClick={postDoneSchedule}>
                שלח סידור חדש
                </Button>
            <Button variant="success" className="" onClick={postTemporarySchedule} disabled={disableSaveButton}>
                שמור סידור
                </Button>
        </>
 
    )
}

export default ShiftsMaker
