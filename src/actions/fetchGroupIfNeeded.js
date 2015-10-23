import {httpStatus,httpJSON} from './utils';
import {fetchFileIfNeeded} from './fetchFileIfNeeded';
import {receiveFile} from './receiveFile';
import Promise from 'bluebird'
export const RECEIVE_GROUP = 'RECEIVE_GROUP';
export const REQUEST_GROUP = 'REQUEST_GROUP';
export const ERROR_FETCHING_GROUP = 'ERROR_FETCHING_GROUP';

function fetchGroup(groupName = 'root',columnId=0){
	const url = `/browse/selection/get/group?items[]=${groupName}`;
	return (dispatch) => {
		dispatch(requestGroup(groupName,columnId));
		return fetch(url)
			.then(httpStatus)
			.then(httpJSON)
			.then(json =>{
				if(json.error){
					dispatch(errorFetchingGroup(groupName,json.error,columnId));
					return;
				}
				const group = json.result.groups[groupName];
				if(!group.files || !group.files.length){
					return json.result;
				}
				const files = group.files.map((path,i)=>{
					const url = `/browse/getMeta${path}`;
					fetch(url)
						.then(httpStatus)
						.then(httpJSON)
						.then(json=>{
							dispatch(receiveFile(path,json.result,columnId))
							group.files[i] = json.result;
						})
				})
				return Promise.all(files).then(()=>{
					return json.result;
				})

			})
			.then(results=>{
				dispatch(receiveGroup(groupName,results,columnId))
			})
			.catch(err=>{
				dispatch(errorFetchingGroup(groupName,err,columnId))
			})
	}
}

function shouldFetchGroup(state, group='root',position=0){
	return true;
}

export function fetchGroupIfNeeded(group='root',columnId=0){
	return(dispatch, getState)=>{
		const state = getState();
		if (shouldFetchGroup(state, group)){
			return dispatch(fetchGroup(group,columnId));
		}
	};
}


function requestGroup(group='root',columnId) {
	return {
		type: REQUEST_GROUP
	,	group
	,	columnId
	};
}


function errorFetchingGroup(group,err,columnId){
	return {
		type: ERROR_FETCHING_GROUP
	,	group
	,	error:err
	,	columnId
	}
}

function receiveGroup(group='root',json,columnId) {
	return {
		type: RECEIVE_GROUP
	,	group
	,	columnId
	,	response: json
	,	receivedAt: Date.now()
	};
}