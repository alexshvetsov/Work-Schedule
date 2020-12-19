import React from 'react'
import { Table, Form, Button } from 'react-bootstrap'

const SubmitShiftsScreen = () => {

    let startingDate = new Date()
    const numberOfDays = 15
    let submittedShifts = []
    for (let i = 0; i < numberOfDays; i++) {
        let newDate = new Date(startingDate.setDate(startingDate.getDate() + 1))
        submittedShifts.push(
            {
                date: newDate,
                submittedShift: 'הכול'
            }
        )
    }
    const setShifts = (e, index) => {
        submittedShifts[index].submittedShift = e.target.value
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
                    {submittedShifts.map((submittedShift, index) => (
                        <tr key={submittedShift.date}>
                            <td>
                                <Form.Control as='select' defaultValue={submittedShift.submittedShift} onChange={(e) => setShifts(e, index)}>
                                    {options.map((option) => <option key={option} value={option}>{option} </option>)}
                                </Form.Control>
                            </td>
                            <td>{`${submittedShift.date.getDate()}/${submittedShift.date.getMonth() + 1}`}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="success" size="lg" block>
                Block level button
            </Button>
        </>
    )
}

export default SubmitShiftsScreen
