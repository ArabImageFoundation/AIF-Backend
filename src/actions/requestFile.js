
export const REQUEST_FILE = 'REQUEST_FILE';

export function requestFile(path,columnId) {
	return {
		type: REQUEST_FILE
	,	path
	,	columnId
	};
}