import {combineReducers} from 'redux';
import columns from './columns';
import items from './items';
import mode from './mode';
import selection from './selection'
import initialState from './initialState'
import {createReducer} from './utils';

export default combineReducers({
	columns:createReducer(initialState.columns,columns)
,	items:createReducer(initialState.items,items)
,	mode:createReducer(initialState.mode,mode)
,	selection:createReducer(initialState.selection,selection)
});
