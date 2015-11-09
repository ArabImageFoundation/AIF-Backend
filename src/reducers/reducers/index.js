import {combineReducers} from 'redux';
import columns from './columns';
import files from './files';
import groups from './groups'
import initialState from './initialState'
import {createReducer} from './utils';

export default combineReducers({
	columns:createReducer(initialState.columns,columns)
,	files:createReducer(initialState.files,files)
,	groups:createReducer(initialState.groups,groups)
});
