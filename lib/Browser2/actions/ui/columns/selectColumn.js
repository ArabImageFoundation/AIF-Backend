export const SELECT_COLUMN = 'SELECT_COLUMN';

export function selectColumn(columnId=0){
	return {
		type: SELECT_COLUMN
	,	columnId
	}
}