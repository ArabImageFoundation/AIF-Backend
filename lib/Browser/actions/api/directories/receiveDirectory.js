export const RECEIVE_DIRECTORY = 'RECEIVE_DIRECTORY';
export function receiveDirectory(path='/',json,columnId) {
	return {
		type: RECEIVE_DIRECTORY
	,	path
	,	columnId
	,	response: json
	,	receivedAt: Date.now()
	};
}