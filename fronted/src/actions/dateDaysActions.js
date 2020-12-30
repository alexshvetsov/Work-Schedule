import { UPDATE_DATE_DAYS_REQUEST, UPDATE_DATE_DAYS_SUCCESS, UPDATE_DATE_DAYS_FAIL } from '../constants/dateDaysConstants.js'
import axios from 'axios';


export const updateDateDaysAction = (dateDays) => async (dispatch, getState) => {
    try {
        dispatch({type:UPDATE_DATE_DAYS_REQUEST})
        const {userLogin:{userInfo}} =getState()
        const config ={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
    
    const {data} =await axios.post(`/api/dateDays`, dateDays, config)
    dispatch({type:UPDATE_DATE_DAYS_SUCCESS, payload:data})
    } catch (error) { 
        dispatch({
            type: UPDATE_DATE_DAYS_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.response
        })
    }
}