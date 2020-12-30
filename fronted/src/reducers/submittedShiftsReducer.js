import {SUBMIT_SHIFTS_FAIL,SUBMIT_SHIFTS_REQUEST, SUBMIT_SHIFTS_SUCCESS,
    UPDATE_SUBMITTED_SHIFTS_FAIL,
      UPDATE_SUBMITTED_SHIFTS_REQUEST, 
      UPDATE_SUBMITTED_SHIFTS_SUCCESS} from '../constants/submittedShiftsConstants.js'

export const submitShiftsReducer = (state = {submittedShifts:{}}, action) => {
    switch (action.type) {
        case SUBMIT_SHIFTS_REQUEST:
            return { loading: true }
        case SUBMIT_SHIFTS_SUCCESS:
            return { loading: false, success: true, submittedShifts: action.payload }
        case SUBMIT_SHIFTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const updateSubmittedShiftsReducer =(state={},action)=>{
    switch(action.type){
        case UPDATE_SUBMITTED_SHIFTS_REQUEST:
            return {loading:true}
        case UPDATE_SUBMITTED_SHIFTS_SUCCESS:
            return {loading:false, updatedShifts:action.payload}
        case UPDATE_SUBMITTED_SHIFTS_FAIL:
            return {loading:false, error:action.payload}
        default: 
            return state;
    }
}




