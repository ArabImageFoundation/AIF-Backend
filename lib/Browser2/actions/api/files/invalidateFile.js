export const INVALIDATE_FILE = 'INVALIDATE_FILE';
export function invalidateFile(path,columnId){
	return {
		type: INVALIDATE_FILE
	,	path
	,	columnId
	};		
}