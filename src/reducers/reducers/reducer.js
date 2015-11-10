import {combineReducers} from 'redux';
import data from './reducer-data';
import mode from './reducer-mode';
import selection from './reducer-selection'
import initialState from './initialState'
import {createReducer} from './utils';

export default combineReducers({
	data:createReducer(initialState.data,data)
,	mode:createReducer(initialState.mode,mode)
,	selection:createReducer(initialState.selection,selection)
});
