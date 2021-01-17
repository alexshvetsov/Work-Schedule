import {
    POST_SCHEDULE_REQUEST, POST_SCHEDULE_SUCCESS, POST_SCHEDULE_FAIL,
    UPDATE_SCHEDULE_BY_DATE_REQUEST, UPDATE_SCHEDULE_BY_DATE_SUCCESS, UPDATE_SCHEDULE_BY_DATE_FAIL,
    UPDATE_TEMP_SHIFTS_ARRAY,
    GET_ALL_SCHEDULES_REQUEST, GET_ALL_SCHEDULES_SUCCESS, GET_ALL_SCHEDULES_FAIL,
    GET_IN_PROGRESS_SCHEDULE_REQUEST, GET_IN_PROGRESS_SCHEDULE_SUCCESS, GET_IN_PROGRESS_SCHEDULE_FAIL,
    POST_TEMPORARY_SCHEDULE_REQUEST, POST_TEMPORARY_SCHEDULE_SUCCESS, POST_TEMPORARY_SCHEDULE_FAIL, UPDATE_TEMPORARY_SCHEDULE_BY_DATE_REQUEST, UPDATE_TEMPORARY_SCHEDULE_BY_DATE_SUCCESS, UPDATE_TEMPORARY_SCHEDULE_BY_DATE_FAIL

} from '../constants/scheduleConstants.js'

export const getSchedulesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_SCHEDULES_REQUEST:
            return { loading: true }
        case GET_ALL_SCHEDULES_SUCCESS:
            return {
                loading: false,
                schedules: action.payload.schedules,
                pages: action.payload.pages,
                page: action.payload.page
            }
        case GET_ALL_SCHEDULES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const getInProgressScheduleReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_IN_PROGRESS_SCHEDULE_REQUEST:
            return { loading: true }
        case GET_IN_PROGRESS_SCHEDULE_SUCCESS:
            return { loading: false, schedule: action.payload }
        case GET_IN_PROGRESS_SCHEDULE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const postScheduleReducer = (state = {}, action) => {
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

export const updateScheduleReducer = (state = {}, action) => {
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

export const updatedTempShiftsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TEMP_SHIFTS_ARRAY:
            return { updatedTempShifts: action.payload }
        default:
            return state
    }
}

export const postTemporaryScheduleReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_TEMPORARY_SCHEDULE_REQUEST:
            return { loading: true }
        case POST_TEMPORARY_SCHEDULE_SUCCESS:
            return { loading: false, success: true }
        case POST_TEMPORARY_SCHEDULE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const updateTemporaryScheduleReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TEMPORARY_SCHEDULE_BY_DATE_REQUEST:
            return { loading: true }
        case UPDATE_TEMPORARY_SCHEDULE_BY_DATE_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_TEMPORARY_SCHEDULE_BY_DATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

