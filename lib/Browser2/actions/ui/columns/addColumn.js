export const ADD_COLUMN = 'ADD_COLUMN';

export function addColumn(path,columnId,columnType,handlerName,fromItemId){
	return {
		type:ADD_COLUMN
	,	path
	,	columnId
	,	columnType
	,	handlerName
	,	itemId:fromItemId
	}
}