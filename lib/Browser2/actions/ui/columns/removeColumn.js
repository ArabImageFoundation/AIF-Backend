export const REMOVE_COLUMN = 'REMOVE_COLUMN';

export function removeColumn(columnId=0){
	return {
		type: REMOVE_COLUMN
	,	columnId
	}
}