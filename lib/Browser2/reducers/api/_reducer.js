import {
	RECEIVE_DIRECTORY
,	REQUEST_DIRECTORY
} from '../../actions/api/directories/_constants';
import {
	RECEIVE_FILE
,	RECEIVE_FILE_CONTENTS
,	REQUEST_FILE
,	REQUEST_FILE_CONTENTS
} from '../../actions/api/files/_constants';
import {
	ERROR_FETCHING
} from '../../actions/api/errorFetching';
import {
	errorFetching
,	receiveDirectory
,	receiveFile
,	receiveFileContents
,	requestDirectory
,	requestFile
,	requestFileContents
} from './_actionsHandlers';
import {defaultState} from './defaults/state'

export function api(state=defaultState,action){
	switch(action.type){
		case ERROR_FETCHING:
			return errorFetching(state,action)
		case RECEIVE_DIRECTORY:
			return receiveDirectory(state,action)
		case RECEIVE_FILE:
			return receiveFile(state,action)
		case RECEIVE_FILE_CONTENTS:
			return receiveFileContents(state,action)
		case REQUEST_DIRECTORY:
			return requestDirectory(state,action)
		case REQUEST_FILE:
			return requestFile(state,action)
		case REQUEST_FILE_CONTENTS:
			return requestFileContents(state,action)
		default:
			return state;
	}
}