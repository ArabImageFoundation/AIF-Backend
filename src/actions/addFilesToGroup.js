import {httpStatus,httpJSON} from './utils';

export const ERROR_ADD_FILES_TO_GROUP = 'ERROR_ADD_FILES_TO_GROUP';
export const REQUEST_ADD_FILES_TO_GROUP = 'REQUEST_ADD_FILES_TO_GROUP';
export const FILES_ADDED_TO_GROUP = 'FILES_ADDED_TO_GROUP';

export function errorAddFilesToGroup(group,files,err){
	return {
		type: ERROR_ADD_FILES_TO_GROUP
	,	group
	,	files
	}
}

export function requestAddFilesToGroup(group,files) {
	return {
		type: REQUEST_ADD_FILES_TO_GROUP
	,	group
	,	files
	};
}

export function filesAddedToGroup(group,files) {
	return {
		type: FILES_ADDED_TO_GROUP
	,	group
	,	files
	};
}

export function addFilesToGroup(group,files){
	const url = `/browse/selection/add/${group}?files[]=`+files.map(item=>item.file.path).join('&files[]=');
	return (dispatch) => {
		dispatch(requestAddFilesToGroup(group,files));
		return fetch(url)
			.then(httpStatus)
			.then(httpJSON)
			.then(json =>{
				//console.log(json)
				return ((json.error)?
					dispatch(errorAddFilesToGroup(group,files,json.error)) :
					dispatch(filesAddedToGroup(group,files))
				);
			})
			.catch(err=>{
				dispatch(errorAddFilesToGroup(group,files))
			})
	}
}