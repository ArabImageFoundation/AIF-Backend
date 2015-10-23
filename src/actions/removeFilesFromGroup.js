import {httpStatus,httpJSON} from './utils';

export const ERROR_REMOVE_FILES_FROM_GROUP = 'ERROR_REMOVE_FILES_FROM_GROUP';
export const REQUEST_REMOVE_FILES_FROM_GROUP = 'REQUEST_REMOVE_FILES_FROM_GROUP';
export const FILES_REMOVED_FROM_GROUP = 'FILES_REMOVED_FROM_GROUP';

export function errorRemoveFilesFromGroup(group,files,err){
	return {
		type: ERROR_REMOVE_FILES_FROM_GROUP
	,	group
	,	files
	}
}

export function requestRemoveFilesFromGroup(group,files) {
	return {
		type: REQUEST_REMOVE_FILES_FROM_GROUP
	,	group
	,	files
	};
}

export function filesRemovedFromGroup(group,files) {
	return {
		type: FILES_REMOVED_FROM_GROUP
	,	group
	,	files
	};
}

export function removeFilesFromGroup(group,files){
	const url = `/browse/selection/remove/${group}?files[]=`+files.map(item=>item.file.path).join('&files[]=');
	return (dispatch) => {
		dispatch(requestRemoveFilesFromGroup(group,files));
		return fetch(url)
			.then(httpStatus)
			.then(httpJSON)
			.then(json =>{
				//console.log(json)
				return ((json.error)?
					dispatch(errorRemoveFilesFromGroup(group,files,json.error)) :
					dispatch(filesRemovedFromGroup(group,files))
				);
			})
			.catch(err=>{
				dispatch(errorRemoveFilesFromGroup(group,files))
			})
	}
}