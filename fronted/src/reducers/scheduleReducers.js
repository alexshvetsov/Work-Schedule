import { POST_SCHEDULE_REQUEST, POST_SCHEDULE_SUCCESS, POST_SCHEDULE_FAIL,
    UPDATE_SCHEDULE_BY_DATE_REQUEST,UPDATE_SCHEDULE_BY_DATE_SUCCESS,UPDATE_SCHEDULE_BY_DATE_FAIL  } from '../constants/scheduleConstants.js'

export const postScheduleReducer = ( state = {}, action ) => {
    switch (action.type) {
        case POST_SCHEDULE_REQUEST:
            return { loading: true }
        case POST_SCHEDULE_SUCCESS:
            return { loading: false, schedule: action.payload }
        case POST_SCHEDULE_FAIL:
            return { loading: false, error: action.payload } 
        default:
            return state
    }
} 

export const updateScheduleReducer = ( state = {}, action ) => {
    switch (action.type) {
        case UPDATE_SCHEDULE_BY_DATE_REQUEST:
            return { loading: true }
        case UPDATE_SCHEDULE_BY_DATE_SUCCESS:
            return { loading: false, schedule: action.payload }
        case UPDATE_SCHEDULE_BY_DATE_FAIL:
            return { loading: false, error: action.payload } 
        default:
            return state
    }
} 