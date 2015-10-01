export const REQUEST_DIRECTORY = 'REQUEST_DIRECTORY';
export const INVALIDATE_DIRECTORY = 'INVALIDATE_DIRECTORY';
export const REQUEST_FILE = 'REQUEST_FILE';
export const REQUEST_FILE_CONTENTS = 'REQUEST_FILE_CONTENTS';
export const RECEIVE_FILE = 'RECEIVE_FILE';
export const RECEIVE_FILE_CONTENTS = 'RECEIVE_FILE_CONTENTS';
export const RECEIVE_DIRECTORY = 'RECEIVE_DIRECTORY';
export const INVALIDATE_FILE = 'INVALIDATE_FILE';
export const ERROR_FETCHING = 'ERROR_FETCHING';

function httpStatus(response){
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	throw new Error(response.statusText)
}

function httpJSON(response){
	return response.json();
}

function httpText(response){
	return response.text();
}

function requestDirectory(directory='/',columnId) {
	return {
		type: REQUEST_DIRECTORY
	,	directory
	,	columnId
	};
}

function requestFile(file,columnId) {
	return {
		type: REQUEST_FILE
	,	file
	,	columnId
	};
}

function requestFileContents(file,columnId) {
	return {
		type: REQUEST_FILE_CONTENTS
	,	file
	,	columnId
	};
}

function invalidateFile(file,columnId){
	return {
		type: INVALIDATE_FILE
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

function receiveFile(file,json,columnId) {
	return {
		type: RECEIVE_FILE
	,	file
	,	columnId
	,	response: json
	,	receivedAt: Date.now()
	};
}

function receiveFileContents(file,contents,columnId) {
	return {
		type: RECEIVE_FILE_CONTENTS
	,	file
	,	columnId
	,	response: contents
	,	receivedAt: Date.now()
	};
}

function receiveDirectory(directory='/',json,columnId) {
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

function fetchDirectory(directory = '/',columnId=0){
	return (dispatch) => {
		directory = directory || '/';
		const url = `/browse/list?src=${directory}&recursion=1`;
		dispatch(requestDirectory(directory,columnId));
		return fetch(url)
			.then(httpStatus)
			.then(httpJSON)
			.then(json =>dispatch(receiveDirectory(directory,json.nested,columnId)))
			.catch(err=>dispatch(errorFetching(directory,err,columnId)))
	}
}

function fetchFile(file,columnId=0){
	return (dispatch) => {
		const url = `/browse/list?src=${file}`;
		dispatch(requestFile(file,columnId));
		return fetch(url)
			.then(httpStatus)
			.then(httpJSON)
			.then(json =>dispatch(receiveFile(file,json.nested,columnId)))
			.catch(err=>dispatch(errorFetching(file,err,columnId)))
	}
}

function fetchFileContents(file,columnId=0){
	return (dispatch) => {
		const url = file;
		dispatch(requestFileContents(file,columnId));
		return fetch(url)
			.then(httpStatus)
			.then(httpText)
			.then(contents =>dispatch(receiveFileContents(file,contents,columnId)))
			.catch(err=>dispatch(errorFetching(file,err,columnId)))
	}
}

function shouldFetchDirectory(state, directory='/',position=0){
	return true;
}

function shouldFetchFile(state, file,position=0){
	return true;
}


function shouldFetchFileContents(state, file,position=0){
	return true;
}

export function fetchFileIfNeeded(file,columnId=0){
	return(dispatch, getState)=>{
		const state = getState();
		if (shouldFetchFile(state, file)){
			return dispatch(fetchFile(file,columnId));
		}
	};
}

export function fetchFileContentsIfNeeded(file,columnId=0){
	return(dispatch, getState)=>{
		const state = getState();
		if (shouldFetchFileContents(state, file)){
			return dispatch(fetchFileContents(file,columnId));
		}
	};
}

export function fetchDirectoryIfNeeded(directory='/',columnId=0){
	return(dispatch, getState)=>{
		const state = getState();
		if (shouldFetchDirectory(state, directory)){
			return dispatch(fetchDirectory(directory,columnId));
		}
	};
}