import { UPDATE_DATE_DAYS_REQUEST, UPDATE_DATE_DAYS_SUCCESS, UPDATE_DATE_DAYS_FAIL } from '../constants/dateDaysConstants.js'

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

const date = new Date(2020, 11, 19)        
const numberOfDays = 15

export const shiftsDateDaysReducer = (state = {date:date,daysAmount:numberOfDays}, action) => {
    switch (action.type) {
        default:
            return state;
    }
}