import {combineReducers} from 'redux';
import {requestStatus,file,selectedDirectory} from './files';
import {columns} from './columns';
import {ui} from './ui'

const rootReducer = combineReducers({
	requestStatus
,	ui
,	file
,	columns
});

export default rootReducer;