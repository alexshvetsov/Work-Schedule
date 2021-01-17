import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import uuid from 'react-uuid'
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_TEMP_SHIFTS_ARRAY } from '../constants/scheduleConstants';

const ShiftsCount = () => {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { users } = userList

    const { updatedTempShifts } = useSelector(state => state.updatedTempShifts)

    const getInProgressSchedule = useSelector(state => state.getInProgressSchedule)
    const { schedule } = getInProgressSchedule



    const countShifts = (name) => {
        if (updatedTempShifts) {
            let count = 0
            updatedTempShifts.map((day, index) => count = count + Object.keys(day).reduce((acc, key) => acc = acc +
                (updatedTempShifts[index][key].filter(worker => worker === name).length), 0
            ))

            return count
        }
    }


    useEffect(() => {
        if(schedule){
        dispatch({ type: UPDATE_TEMP_SHIFTS_ARRAY, payload: schedule.shifts })
        }
    }, [dispatch, updatedTempShifts,schedule])


    return (
        <ListGroup className='mt-3'>
            {(users && updatedTempShifts) && users.map(user => <ListGroup.Item key={uuid()}>{user.name} - {countShifts(user.name) || 0}</ListGroup.Item>)}

        </ListGroup>
    )
}

export default ShiftsCount
