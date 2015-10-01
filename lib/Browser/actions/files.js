export const REQUEST_DIRECTORY = 'REQUEST_DIRECTORY';
export const RECEIVE_DIRECTORY = 'RECEIVE_DIRECTORY';
export const ERROR_FETCHING = 'ERROR_FETCHING';
export const INVALIDATE_DIRECTORY = 'INVALIDATE_DIRECTORY';

function requestFiles(directory='/',columnId) {
	return {
		type: REQUEST_DIRECTORY
	,	directory
	,	columnId
	};
}

function invalidateDirectory(directory='/',columnId){
	return {
		type: INVALIDATE_DIRECTORY
	,	directory
	,	columnId
	};	
}

function receiveFiles(directory='/',json,columnId) {
	return {
		type: RECEIVE_DIRECTORY
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