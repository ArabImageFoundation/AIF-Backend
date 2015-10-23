export const COLUMN_FILTER_ON = 'COLUMN_FILTER_ON';

export function columnFilterOn(columnId=0){
	return {
		type: COLUMN_FILTER_ON
	,	columnId
	}
}