
export const RECEIVE_FILE = 'RECEIVE_FILE';

export function receiveFile(path,json,columnId) {
	return {
		type: RECEIVE_FILE
	,	path
	,	columnId
	,	response: json
	,	receivedAt: Date.now()
	};
}