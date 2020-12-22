import React, { useEffect } from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { submitShiftsAction,updateSubmittedShiftsAction } from '../actions/submitShiftsActions.js'


const SubmitShiftsScreen = () => {

    const dispatch = useDispatch();

    const shiftsDate = useSelector(state => state.shiftsDate)
    const { date, numberOfDays } = shiftsDate

    const submitShifts = useSelector(state => state.submitShifts)
    const { submittedShifts } = submitShifts
    let submittedShiftsArray = []
    console.log( new Date(date)); 
    if (!submittedShifts || new Date(submittedShifts.date).toString() != new Date(date).toString() ) { 
        let startingDate = new Date(date)
        for (let i = 0; i < numberOfDays; i++) {
            let newDate = new Date(startingDate.setDate(startingDate.getDate() + 1))
            submittedShiftsArray.push(
                {
                    date: newDate,
                    submittedShift: 'הכול'
                }
            )
        }
    } else {
        console.log('essd')
         submittedShiftsArray = submittedShifts.submittedShiftsArray

    }


    const setShifts = (e, index) => {
        submittedShiftsArray[index].submittedShift = e.target.value
    }

    const submitForm = () => {
    if (!submittedShifts || new Date(submittedShifts.date).toString() != new Date(date).toString() ) { 
        dispatch(submitShiftsAction({ date, submittedShiftsArray }))
    }else{
        console.log('else2');
        dispatch(updateSubmittedShiftsAction({date,submittedShiftsArray}))
    }

    } 

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
