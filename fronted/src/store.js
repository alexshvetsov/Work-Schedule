import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userLoginReducer, userRegisterReducer, userDetailsReducer,
    userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer
} from './reducers/userReducers.js'
import { submitShiftsReducer,updateSubmittedShiftsReducer,getAllSubmittedShiftsByDateReducer, getOneSubmittedShiftsByDateReducer } from './reducers/submittedShiftsReducer.js'
import { workerTeamsReducer } from './reducers/workerTeamsReducer.js';
import { postTemporaryScheduleReducer,updatedTempShiftsReducer
    ,updateScheduleReducer,getSchedulesReducer, getInProgressScheduleReducer,postScheduleReducer,updateTemporaryScheduleReducer } from './reducers/scheduleReducers.js';
import { updateDateDaysReducer, getShiftsDateDaysReducer } from './reducers/dateDaysReducers.js';


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer, 
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    submitShifts: submitShiftsReducer,
    getOneSubmittedShiftsByDate:getOneSubmittedShiftsByDateReducer,
    updateSubmittedShifts:updateSubmittedShiftsReducer,
    getAllSubmittedShiftsByDate:getAllSubmittedShiftsByDateReducer,
    shiftsDateDays:getShiftsDateDaysReducer, 
    updateDateDays:updateDateDaysReducer,
    workerTeams:workerTeamsReducer, 
    getSchedules:getSchedulesReducer,
    getInProgressSchedule:getInProgressScheduleReducer,
    postSchedule:postScheduleReducer, 
    updateSchedule:updateScheduleReducer,
    postTemporarySchedule:postTemporaryScheduleReducer,
    updateTemporarySchedule:updateTemporaryScheduleReducer,
    updatedTempShifts:updatedTempShiftsReducer
}) 
 
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

   

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
} 

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;      