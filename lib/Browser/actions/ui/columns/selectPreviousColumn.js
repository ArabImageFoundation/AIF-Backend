export const SELECT_PREVIOUS_COLUMN = 'SELECT_PREVIOUS_COLUMN';

export function selectPreviousColumn(columnId=0){
	return {
		type:SELECT_PREVIOUS_COLUMN
	,	columnId:--columnId
	}
}