import {combineReducers} from 'redux';
import {requestStatus} from './files';
import {columns} from './columns';
import {ui} from './ui'

const rootReducer = combineReducers({
	requestStatus
,	ui
,	columns
});

export default rootReducer;