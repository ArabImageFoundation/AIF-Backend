export const REQUEST_FILE_CONTENTS = 'REQUEST_FILE_CONTENTS';
export function requestFileContents(path,columnId) {
	return {
		type: REQUEST_FILE_CONTENTS
	,	path
	,	columnId
	};
}