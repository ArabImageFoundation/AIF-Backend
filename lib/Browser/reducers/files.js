import {SELECT_DIRECTORY,INVALIDATE_DIRECTORY,REQUEST_FILES, RECEIVE_FILES} from '../actions/files';


export function selectedDirectory(state = '/', action) {
	switch (action.type) {
		case SELECT_DIRECTORY:
			return action.directory;
			break;
		default:
			return state;
			break;
	}
}

export function requestStatus(state = {
	isFetching: false
,	didInvalidate: true
}, action){
	switch (action.type){
		case INVALIDATE_DIRECTORY:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		case REQUEST_FILES:
			return Object.assign({}, state, {
				isFetching: true
			,	didInvalidate: false
			});
		case RECEIVE_FILES:
			return Object.assign({}, state, {
				isFetching: false
			,	didInvalidate: false
			,	lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}

export function file(state={},action){
	switch(action.type){
		case RECEIVE_FILES:
			return Object.assign({},state,action.response)
		default:
			return state
	}
}