export const INVALIDATE_DIRECTORY = 'INVALIDATE_DIRECTORY';

export function invalidateDirectory(path='/',columnId){
	return {
		type: INVALIDATE_DIRECTORY
	,	path
	,	columnId
	};	
}