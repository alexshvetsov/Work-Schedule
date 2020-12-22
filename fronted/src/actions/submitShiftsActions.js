import {SUBMIT_SHIFTS_FAIL,SUBMIT_SHIFTS_REQUEST, SUBMIT_SHIFTS_SUCCESS, 
    UPDATE_SUBMITTED_SHIFTS_FAIL, 
    UPDATE_SUBMITTED_SHIFTS_REQUEST,
     UPDATE_SUBMITTED_SHIFTS_SUCCESS} from '../constants/submittedShiftsConstants.js'
import axios from 'axios'

export const submitShiftsAction = (submittedshifts) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUBMIT_SHIFTS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } =  await axios.post(`/api/submittedshifts`, submittedshifts, config)
        localStorage.setItem('submittedshifts', JSON.stringify(data))

        dispatch({
            type: SUBMIT_SHIFTS_SUCCESS, payload: data  
        })

    } catch (error) {
        dispatch({
            type: SUBMIT_SHIFTS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateSubmittedShiftsAction = (submittedShifts)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:UPDATE_SUBMITTED_SHIFTS_REQUEST
        })
        const {submitShifts:{submittedShifts:submittedShiftsFromState}}=getState()
        console.log(submittedShiftsFromState._id);
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            },
        }
        const {data}= await axios.put(`/api/submittedShifts/${submittedShiftsFromState._id}`,submittedShifts,config)
        localStorage.setItem('submittedshifts',JSON.stringify(data))
        dispatch({type:UPDATE_SUBMITTED_SHIFTS_SUCCESS, payload:data})
    } catch(error){
        dispatch({
            type:UPDATE_SUBMITTED_SHIFTS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}