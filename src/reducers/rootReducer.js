import {combineReducers} from 'redux';
import {columns} from './columns';
import {api} from './api';
import {groups} from './groups';
import {mode} from './mode';

const rootReducer = combineReducers({
	columns
,	api
,	groups
,	mode
//,	info
});

export default rootReducer;