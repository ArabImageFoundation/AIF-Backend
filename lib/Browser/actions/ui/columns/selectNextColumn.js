export const SELECT_NEXT_COLUMN = 'SELECT_NEXT_COLUMN';

export function selectNextColumn(columnId=0){
	return {
		type:SELECT_NEXT_COLUMN
	,	columnId:++columnId
	}
}