import {
    POST_SCHEDULE_REQUEST, POST_SCHEDULE_SUCCESS, POST_SCHEDULE_FAIL,
    UPDATE_SCHEDULE_BY_DATE_REQUEST, UPDATE_SCHEDULE_BY_DATE_SUCCESS, UPDATE_SCHEDULE_BY_DATE_FAIL
} from '../constants/scheduleConstants.js'
import axios from 'axios'

export const postScheduleAction = (schedule) => async (dispatch, getState) => {
    console.log(schedule);
    try {
        dispatch({ type: POST_SCHEDULE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/schedule', schedule, config)
        dispatch({ type: POST_SCHEDULE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: POST_SCHEDULE_FAIL, payload:
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }
}

export const updateScheduleAction = (shifts, date) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_SCHEDULE_BY_DATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }   
        const { data } = await axios.put(`/api/schedule/${date}`, shifts, config) 
        dispatch({ type: UPDATE_SCHEDULE_BY_DATE_SUCCESS, payload:data })
    } catch (error) {
        dispatch({
            type: UPDATE_SCHEDULE_BY_DATE_FAIL, payload:
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })
    }


}
