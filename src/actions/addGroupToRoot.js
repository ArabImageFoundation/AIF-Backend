import {httpStatus,httpJSON} from './utils';

export const ERROR_ADD_GROUP_TO_ROOT = 'ERROR_ADD_GROUP_TO_ROOT';
export const REQUEST_ADD_GROUP_TO_ROOT = 'REQUEST_ADD_GROUP_TO_ROOT';
export const GROUP_ADDED_TO_ROOT = 'GROUP_ADDED_TO_ROOT';

export function errorAddingGroupToRoot(group,err){
	return {
		type: ERROR_ADD_GROUP_TO_ROOT
	,	group
	,	err
	}
}

export function requestAddGroupToRoot(group) {
	return {
		type: REQUEST_ADD_GROUP_TO_ROOT
	,	group
	};
}

export function groupAddedToRoot(group) {
	return {
		type: GROUP_ADDED_TO_ROOT
	,	group
	};
}

export function addGroupToRoot(group){
	const url = `/browse/selection/root?group[]=${group}`;
	return (dispatch) => {
		dispatch(requestAddGroupToRoot(group));
		return fetch(url)
			.then(httpStatus)
			.then(httpJSON)
			.then(json =>{
				//console.log(json)
				return ((json.error)?
					dispatch(errorAddFilesToGroup(group,json.error)) :
					dispatch(groupAddedToRoot(group))
				);
			})
			.catch(err=>{
				dispatch(errorAddFilesToGroup(group,err))
			})
	}
}