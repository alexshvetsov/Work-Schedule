import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Alert, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { submitShiftsAction, updateSubmittedShiftsAction } from '../actions/submitShiftsActions.js'
import { getDateDaysAction } from '../actions/dateDaysActions';
import DemoAlert from '../components/DemoAlert.js';
import { Link } from 'react-router-dom';




const SubmitShiftsScreen = ({ history }) => {

    const dispatch = useDispatch();

    const [showAlert, setShowAlert] = useState(false)
    const [showDemoAlert, setShowDemoAlert] = useState(false)

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const shiftsDateDays = useSelector(state => state.shiftsDateDays)
    const { date, daysAmount, disableSubmitting } = shiftsDateDays

    const getOneSubmittedShiftsByDate = useSelector(state => state.getOneSubmittedShiftsByDate)
    const { submittedShiftsByDate } = getOneSubmittedShiftsByDate

    let submittedShiftsArray = []


    if (!submittedShiftsByDate) {
        if (date) {
            let startingDate = new Date(date)
            for (let i = 0; i < daysAmount; i++) {
                let newDate = i === 0 ? new Date(startingDate.setDate(startingDate.getDate())) : new Date(startingDate.setDate(startingDate.getDate() + 1))
                submittedShiftsArray.push(
                    {
                        date: newDate,
                        submittedShift: 'הכול'
                    }
                )
            }
        }
    } else {
        submittedShiftsArray = submittedShiftsByDate.submittedShiftsArray
    }

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    const setDay = (dayNumber) => {
        if (date) {
            const dayWord = new Date(Number(new Date(date).getFullYear()), Number(new Date(date).getMonth()), Number(dayNumber)).getDay()
            return days[dayWord]
        } else return null
    }


    const setShifts = (e, index) => {
        submittedShiftsArray[index].submittedShift = e.target.value
    }

    const submitForm = () => {
        if (userInfo.name === 'demo') {
            setShowDemoAlert(true)
            setTimeout(() => setShowDemoAlert(false), 5000)
            return
        }

        setShowAlert(true)
        if (!submittedShiftsByDate) {
            dispatch(submitShiftsAction({ date, submittedShiftsArray }))
        } else {
            dispatch(updateSubmittedShiftsAction({ date, submittedShiftsArray }))
        }
        setTimeout(() => {
            setShowAlert(false)
            history.push('/')
        }, 2000)


    }


    useEffect(() => {
        if (!date) {
            dispatch(getDateDaysAction())
        }

    }, [dispatch, date])



    const options = ['הכול', 'כלום', 'בוקר', 'צהריים', 'לילה', 'בוקר / צהריים', 'בוקר / לילה', 'צהריים / לילה']
    return (
        <>
            {showDemoAlert && <DemoAlert />}
            <Row style={{ 'direction': 'rtl' }}>
                <Link
                    className='btn btn-primary my-3'
                    to='/'>
                    דף הבית
                    </Link>

            </Row>
            { submittedShiftsArray && <Table className="right" striped bordered hover responsive size="sm" variant="dark">

                <thead>
                    <tr>
                        <th>משמרות</th>
                        <th>תאריך</th>
                        <th>יום</th>
                    </tr>
                </thead>
                <tbody className='right'>
                    {submittedShiftsArray.map((submittedShift, index) => (
                        <tr className={
                            setDay(new Date(date).getDate() + index) === 'שישי' || setDay(new Date(date).getDate() + index) === 'שבת' ?
                                'green' : ''
                        } key={submittedShift.date}>
                            <td>
                                <Form.Control className='rtl' as='select' defaultValue={submittedShiftsArray[index].submittedShift} onChange={(e) => setShifts(e, index)}>
                                    {options.map((option) => <option key={option} value={option}>{option} </option>)}
                                </Form.Control>
                            </td>
                            <td>{`${new Date(submittedShift.date).getDate()}/${new Date(submittedShift.date).getMonth() + 1}`}</td>
                            <td >{setDay(new Date(date).getDate() + index)}</td>
                        </tr>
                    ))}
                </tbody>

            </Table>}
            {showAlert && <Alert className='flex right rtl' variant='success'>
                <p className='align-self right'>!!!המשמרות הוגשו בהצלחה</p>
            </Alert>
            }
              {disableSubmitting && <Alert className='flex right rtl' variant='danger'>
                <p className='align-self right'>הזמן להגשת המשמרות פג</p>
            </Alert>
            }
            <Button variant="success" size="lg" block onClick={submitForm} disabled={disableSubmitting}>
                הגש משמרות
            </Button>

        </>
    )
}

export default SubmitShiftsScreen
