import React from 'react'
import {Table} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import uuid from 'react-uuid'
export const AllOptions = () => {
    const getAllSubmittedShiftsByDate = useSelector(state => state.getAllSubmittedShiftsByDate)
    const { submittedShiftsByDate } = getAllSubmittedShiftsByDate
    return (
        <>
            <Table className='options-table'>
                <thead>
                    <tr>
                  {submittedShiftsByDate && submittedShiftsByDate.options[0][1].map(name=><th key={name[0]}>{name[0].split(' ')[0]}</th>)}
                        <th>תאריך</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedShiftsByDate && submittedShiftsByDate.options.map((option, index)=><tr key={uuid()}>
                        {option[1].map(person=><td key={person[0].split(' ')[0]}>{person[1]}</td>)}<th>{option[0]}</th></tr>)}
                </tbody>
            </Table>
        </>
    )
} 
