import {httpStatus,httpJSON} from './utils';
import {fetchGroupIfNeeded} from './fetchGroupIfNeeded';
export const ERROR_FETCHING_ROOT_GROUPS = 'ERROR_FETCHING_ROOT_GROUPS';
export const REQUEST_FETCHING_ROOT_GROUPS = 'REQUEST_FETCHING_ROOT_GROUPS';
export const ROOT_GROUPS_FETCHED = 'ROOT_GROUPS_FETCHED';

export function fetchRootGroups(columnId){
	return fetchGroupIfNeeded('root',columnId)
}