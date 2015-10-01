import {
	INVALIDATE_DIRECTORY
,	REQUEST_DIRECTORY
,	RECEIVE_DIRECTORY
,	REQUEST_FILE
,	REQUEST_FILE_CONTENTS
,	RECEIVE_FILE
,	RECEIVE_FILE_CONTENTS
,	INVALIDATE_FILE
} from '../actions/files';


export function requestStatus(state = {
	isFetching: false
,	didInvalidate: true
}, action){
	switch (action.type){
		case INVALIDATE_DIRECTORY:
		case INVALIDATE_FILE:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		case REQUEST_DIRECTORY:
		case REQUEST_FILE:
		case REQUEST_FILE_CONTENTS:
			return Object.assign({}, state, {
				isFetching: true
			,	didInvalidate: false
			});
		case RECEIVE_DIRECTORY:
		case RECEIVE_FILE:
		case RECEIVE_FILE_CONTENTS:
			return Object.assign({}, state, {
				isFetching: false
			,	didInvalidate: false
			,	lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}