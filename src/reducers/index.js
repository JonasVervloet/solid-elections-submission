import {combineReducers} from 'redux';

import webIDReducer from './webID';
import userInfoReducer from './userInfo';
import expensesInfoReducer from './expensesInfo';
import LoadSaveReducer from './LoadSaveReducer'

const combinedReducer = combineReducers({
    webID: webIDReducer,
    userInfo: userInfoReducer,
    expensesInfo: expensesInfoReducer,
    loadsave: LoadSaveReducer
});

export default combinedReducer;

