import {combineReducers} from 'redux';
import {columns} from './columns';
import {api} from './api';

export const rootReducer = combineReducers({
	columns
,	api
//,	info
});