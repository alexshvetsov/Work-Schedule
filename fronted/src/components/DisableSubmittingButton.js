import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap'
import { updateSubmittingStatus } from '../actions/dateDaysActions';


export const DisableSubmittingButton = () => {
    const dispatch = useDispatch()

    const shiftsDateDays = useSelector(state => state.shiftsDateDays)
    const { date: dateState, daysAmount: daysAmountState, disableSubmitting, id } = shiftsDateDays



    const submitForm = (checked) => {
        dispatch(updateSubmittingStatus(checked, id))
    }

    return (
        <>
            <Form.Check
                type="checkbox"
                className="right"
                id="inlineFormCheck"
                label="בטל אפשרות להגשת משמרות"
                checked={disableSubmitting} onChange={(e) => submitForm(e.target.checked)}
            />
        </>
    )
}
