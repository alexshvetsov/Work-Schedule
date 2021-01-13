import {
    // POST_WORKER_TEAMS_REQUEST,POST_WORKER_TEAMS_SUCCESS,POST_WORKER_TEAMS_FAIL
    UPDATE_WORKER_TEAMS } from '../constants/workerTeamsConstants'


export const postWorkerTeamsReducr=(state={},action)=>{

} 

export const workerTeamsReducer=(state={workerTeams:[]},action)=>{
    switch (action.type) {
        case UPDATE_WORKER_TEAMS:
           return {workerTeams:action.payload} 
        default:
            return state;
    }
} 