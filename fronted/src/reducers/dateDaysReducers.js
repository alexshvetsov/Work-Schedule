import {
    UPDATE_DATE_DAYS_REQUEST, UPDATE_DATE_DAYS_SUCCESS, UPDATE_DATE_DAYS_FAIL,
    GET_DATE_DAYS_REQUEST, GET_DATE_DAYS_SUCCESS, GET_DATE_DAYS_FAIL
} from '../constants/dateDaysConstants.js'

export const updateDateDaysReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_DATE_DAYS_REQUEST:
            return { loading: true }
        case UPDATE_DATE_DAYS_SUCCESS:
            return { loading: false, dateDays: action.payload }
        case UPDATE_DATE_DAYS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
 
export const getShiftsDateDaysReducer = (state = { }, action) => {
    switch (action.type) {
        case GET_DATE_DAYS_REQUEST:
            return { loading: true }
        case GET_DATE_DAYS_SUCCESS:
            return { loading: false,disableSubmitting:action.payload.disableSubmitting, id:action.payload._id,date: new Date(action.payload.date), daysAmount: action.payload.daysAmount }
        case GET_DATE_DAYS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}