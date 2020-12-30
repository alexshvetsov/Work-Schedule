import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userLoginReducer, userRegisterReducer, userDetailsReducer,
    userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer
} from './reducers/userReducers.js'
import { submitShiftsReducer,updateSubmittedShiftsReducer } from './reducers/submittedShiftsReducer.js'
import { workerTeamsReducer } from './reducers/workerTeamsReducer.js';
import { updateDateDaysReducer, shiftsDateDaysReducer } from './reducers/dateDaysReducers.js';


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
    shiftsDateDays:shiftsDateDaysReducer,
    workerTeams:workerTeamsReducer,
    updateDateDays:updateDateDaysReducer
}) 

// להסויף שאם יש בבסיס נונים או בלוגאל סטורג איזהשו משמרות מוגשות זה יעדכן אליהם
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