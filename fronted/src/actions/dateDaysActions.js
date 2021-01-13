import {
    UPDATE_DATE_DAYS_REQUEST, UPDATE_DATE_DAYS_SUCCESS, UPDATE_DATE_DAYS_FAIL,
    GET_DATE_DAYS_REQUEST, GET_DATE_DAYS_SUCCESS, GET_DATE_DAYS_FAIL
} from '../constants/dateDaysConstants.js'
import axios from 'axios';
import { getAllSubmittedShiftsByDateAction } from './submitShiftsActions.js'


export const updateDateDaysAction = (dateDays) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_DATE_DAYS_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/dateDays`, dateDays, config)
        dispatch({ type: UPDATE_DATE_DAYS_SUCCESS, payload: data })
        dispatch({ type: GET_DATE_DAYS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: UPDATE_DATE_DAYS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.response
        })
    }
}

export const getDateDaysAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_DATE_DAYS_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.get('/api/datedays', config)
        dispatch({ type: GET_DATE_DAYS_SUCCESS, payload: data })
        if (userInfo.isAdmin) {
            
           dispatch(getAllSubmittedShiftsByDateAction(data.date))

            //פה לכניס את הקריאה לשרת שיביא את כל המשמרות 
        }
    } catch (error) {
        dispatch({
            type: GET_DATE_DAYS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.response
        })
    }
}