import {SELECT_DIRECTORY,INVALIDATE_DIRECTORY,REQUEST_DIRECTORY, RECEIVE_DIRECTORY} from '../actions/files';


export function requestStatus(state = {
	isFetching: false
,	didInvalidate: true
}, action){
	switch (action.type){
		case INVALIDATE_DIRECTORY:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		case REQUEST_DIRECTORY:
			return Object.assign({}, state, {
				isFetching: true
			,	didInvalidate: false
			});
		case RECEIVE_DIRECTORY:
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
		case RECEIVE_DIRECTORY:
			return Object.assign({},state,action.response)
		default:
			return state
	}
}