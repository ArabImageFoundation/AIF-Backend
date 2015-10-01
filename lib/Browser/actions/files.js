export const REQUEST_FILES = 'REQUEST_FILES';
export const RECEIVE_FILES = 'RECEIVE_FILES';
export const SELECT_DIRECTORY = 'SELECT_DIRECTORY';
export const INVALIDATE_DIRECTORY = 'INVALIDATE_DIRECTORY';
export const ERROR_FETCHING = 'ERROR_FETCHING';

export function selectDirectory(directory='/'){
	return {
		type: SELECT_DIRECTORY
	,	directory
	};
}

export function invalidateDirectory(directory='/') {
	return {
		type: INVALIDATE_DIRECTORY
	,	directory
	};
}

function requestFiles(directory='/',columnId) {
	return {
		type: REQUEST_FILES
	,	directory
	,	columnId
	};
}



function receiveFiles(directory='/',json,columnId) {
	return {
		type: RECEIVE_FILES
	,	directory
	,	columnId
	,	response: json
	,	receivedAt: Date.now()
	};
}

function errorFetching(directory,err,columnId){
	return {
		type: ERROR_FETCHING
	,	directory
	,	error:err
	,	columnId
	}
}

function fetchFiles(directory = '/',columnId=0){
	return (dispatch) => {
		directory = directory || '/';
		const url = `/browse/list?src=${directory}&recursion=1`;
		dispatch(requestFiles(directory,columnId));
		return fetch(url)
			.then(req => req.json())
			.then(json =>dispatch(receiveFiles(directory,json.nested,columnId)))
			.catch(err=>dispatch(errorFetching(directory,err,columnId)))
	}
}

function shouldFetchFiles(state, directory='/',position=0){
	return true;
}

export function fetchFilesIfNeeded(directory='/',columnId=0){
	return(dispatch, getState)=>{
		const state = getState();
		if (shouldFetchFiles(state, directory)){
			return dispatch(fetchFiles(directory,columnId));
		}
	};
}