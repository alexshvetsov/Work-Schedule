import {
    POST_SCHEDULE_REQUEST, POST_SCHEDULE_SUCCESS, POST_SCHEDULE_FAIL,
    UPDATE_SCHEDULE_BY_DATE_REQUEST, UPDATE_SCHEDULE_BY_DATE_SUCCESS, UPDATE_SCHEDULE_BY_DATE_FAIL,
    GET_ALL_SCHEDULES_REQUEST, GET_ALL_SCHEDULES_SUCCESS, GET_ALL_SCHEDULES_FAIL,
    GET_IN_PROGRESS_SCHEDULE_REQUEST, GET_IN_PROGRESS_SCHEDULE_SUCCESS, GET_IN_PROGRESS_SCHEDULE_FAIL,
    POST_TEMPORARY_SCHEDULE_REQUEST,POST_TEMPORARY_SCHEDULE_SUCCESS,POST_TEMPORARY_SCHEDULE_FAIL, UPDATE_TEMPORARY_SCHEDULE_BY_DATE_REQUEST, UPDATE_TEMPORARY_SCHEDULE_BY_DATE_SUCCESS, UPDATE_TEMPORARY_SCHEDULE_BY_DATE_FAIL
} from '../constants/scheduleConstants.js'
import axios from 'axios'

export const getAllSchedulesAction = ( pageNumber = '') => async (dispatch) => {

    try {
        dispatch({ type: GET_ALL_SCHEDULES_REQUEST })

        const { data } = await axios.get(`/api/schedule?pageNumber=${pageNumber}`)
        dispatch({ type: GET_ALL_SCHEDULES_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: GET_ALL_SCHEDULES_FAIL, payload:
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }
}

export const getInProgressScheduleAction = (date,daysAmount) => async (dispatch, getState) => {

    try {
        dispatch({ type: GET_IN_PROGRESS_SCHEDULE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/schedule/progression/${date}/${daysAmount}`, config)
        dispatch({ type: GET_IN_PROGRESS_SCHEDULE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: GET_IN_PROGRESS_SCHEDULE_FAIL, payload:
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }
}



export const postScheduleAction = (schedule) => async (dispatch, getState) => {

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
        dispatch({ type: GET_IN_PROGRESS_SCHEDULE_SUCCESS, payload: data })


    } catch (error) {
        dispatch({
            type: POST_SCHEDULE_FAIL, payload:
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }
}

export const updateScheduleAction = (shifts, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_SCHEDULE_BY_DATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        } 
        const { data } = await axios.put(`/api/schedule/${id}`, shifts, config)
        dispatch({ type: UPDATE_SCHEDULE_BY_DATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: UPDATE_SCHEDULE_BY_DATE_FAIL, payload:
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })
    }


}


export const postTemporaryScheduleAction = (schedule) => async (dispatch, getState) => {
    
    try {
        dispatch({ type: POST_TEMPORARY_SCHEDULE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/schedule/progression', schedule, config)
        dispatch({ type: POST_TEMPORARY_SCHEDULE_SUCCESS})
        dispatch({ type: GET_IN_PROGRESS_SCHEDULE_SUCCESS, payload: data })


    } catch (error) {
        dispatch({
            type: POST_TEMPORARY_SCHEDULE_FAIL, payload:
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })

    }
}

export const updateTemporaryScheduleAction = (shifts, date) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_TEMPORARY_SCHEDULE_BY_DATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        } 
        const { data } = await axios.put(`/api/schedule/progression/${date}`, shifts, config)
        dispatch({ type: UPDATE_TEMPORARY_SCHEDULE_BY_DATE_SUCCESS, })
    } catch (error) {
        dispatch({
            type: UPDATE_TEMPORARY_SCHEDULE_BY_DATE_FAIL, payload:
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
        })
    }


}
