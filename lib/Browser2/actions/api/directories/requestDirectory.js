export const REQUEST_DIRECTORY = 'REQUEST_DIRECTORY';

export function requestDirectory(path='/',columnId) {
	return {
		type: REQUEST_DIRECTORY
	,	path
	,	columnId
	};
}