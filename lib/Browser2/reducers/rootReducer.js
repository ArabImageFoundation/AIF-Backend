import {combineReducers} from 'redux';
import {columns} from './columns';
import {api} from './api';
import {groups} from './groups';

export const rootReducer = combineReducers({
	columns
,	api
,	groups
//,	info
});