export const ERROR_FETCHING = 'ERROR_FETCHING';

export function errorFetching(path,err,columnId){
	return {
		type: ERROR_FETCHING
	,	path
	,	error:err
	,	columnId
	}
}