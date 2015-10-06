
export const RECEIVE_FILE_CONTENTS = 'RECEIVE_FILE_CONTENTS';
export function receiveFileContents(path,contents,columnId) {
	return {
		type: RECEIVE_FILE_CONTENTS
	,	path
	,	columnId
	,	response: contents
	,	receivedAt: Date.now()
	};
}