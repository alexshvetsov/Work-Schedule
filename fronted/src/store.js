import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userLoginReducer, userRegisterReducer, userDetailsReducer,
    userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer
} from './reducers/userReducers.js'
import { submitShiftsReducer,updateSubmittedShiftsReducer,getAllSubmittedShiftsByDateReducer } from './reducers/submittedShiftsReducer.js'
import { workerTeamsReducer } from './reducers/workerTeamsReducer.js';
import { postScheduleReducer,updateScheduleReducer } from './reducers/scheduleReducers.js';
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
    updateSubmittedShifts:updateSubmittedShiftsReducer,
    getAllSubmittedShiftsByDate:getAllSubmittedShiftsByDateReducer,
    shiftsDateDays:getShiftsDateDaysReducer, 
    updateDateDays:updateDateDaysReducer,
    workerTeams:workerTeamsReducer,
    postSchedule:postScheduleReducer, 
    updateSchedule:updateScheduleReducer
}) 
 
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

    const submittedshiftsFromStorage = localStorage.getItem('submittedshifts')
    ? JSON.parse(localStorage.getItem('submittedshifts'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    submitShifts:{submittedShifts:submittedshiftsFromStorage}
} 

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;      