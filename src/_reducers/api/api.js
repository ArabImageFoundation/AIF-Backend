import {
	RECEIVE_DIRECTORY
,	REQUEST_DIRECTORY
,	RECEIVE_FILE
,	RECEIVE_FILE_CONTENTS
,	REQUEST_FILE
,	REQUEST_FILE_CONTENTS
,	ERROR_FETCHING
,	FILES_ADDED_TO_GROUP
,	FILES_REMOVED_FROM_GROUP
} from '../../actions';

import {errorFetching} from './errorFetching';
import {receiveDirectory} from './receiveDirectory';
import {receiveFile} from './receiveFile';
import {receiveFileContents} from './receiveFileContents';
import {requestDirectory} from './requestDirectory';
import {requestFile} from './requestFile';
import {requestFileContents} from './requestFileContents';
import {defaultState} from './defaults/state'
import {filesAddedToGroup} from './filesAddedToGroup';
import {filesRemovedFromGroup} from './filesRemovedFromGroup';

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
		case FILES_ADDED_TO_GROUP:
			return filesAddedToGroup(state,action)
		case FILES_REMOVED_FROM_GROUP:
			return filesRemovedFromGroup(state,action)
		default:
			return state;
	}
}