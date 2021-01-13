import React, { useEffect } from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { submitShiftsAction, updateSubmittedShiftsAction } from '../actions/submitShiftsActions.js'
import { getDateDaysAction } from '../actions/dateDaysActions';



const SubmitShiftsScreen = () => {

    const dispatch = useDispatch();

    const shiftsDateDays = useSelector(state => state.shiftsDateDays)
    const { date, daysAmount } = shiftsDateDays

    const submitShifts = useSelector(state => state.submitShifts)
    const { submittedShifts } = submitShifts
    let submittedShiftsArray = []


    if (!submittedShifts || new Date(submittedShifts.date).toString() !== new Date(date).toString()) {
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
        submittedShiftsArray = submittedShifts.submittedShiftsArray

    }


    const setShifts = (e, index) => {
        submittedShiftsArray[index].submittedShift = e.target.value
    }

    const submitForm = () => {
        if (!submittedShifts || new Date(submittedShifts.date).toString() !== new Date(date).toString()) {
            dispatch(submitShiftsAction({ date, submittedShiftsArray }))
        } else {
            dispatch(updateSubmittedShiftsAction({ date, submittedShiftsArray }))
        }

    }


    useEffect(() => {
        if (!date) {
            dispatch(getDateDaysAction())
        }
    }, [dispatch,date])



    const options = ['הכול', 'כלום', 'בוקר', 'צהריים', 'לילה', 'בוקר / צהריים', 'בוקר / לילה', 'צהריים / לילה']
    return (
        <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>משמרות</th>
                        <th>תאריך</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedShiftsArray.map((submittedShift, index) => (
                        <tr key={submittedShift.date}>
                            <td>
                                <Form.Control className='rtl' as='select' defaultValue={submittedShiftsArray[index].submittedShift} onChange={(e) => setShifts(e, index)}>
                                    {options.map((option) => <option key={option} value={option}>{option} </option>)}
                                </Form.Control>
                            </td>
                            {/* <td>{`${submittedShift.date.getDate()}/${submittedShift.date.getMonth() + 1}`}</td> */}
                            <td>{`${new Date(submittedShift.date).getDate()}/${new Date(submittedShift.date).getMonth() + 1}`}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="success" size="lg" block onClick={submitForm}>
                Block level button
            </Button>
        </>
    )
}

export default SubmitShiftsScreen
