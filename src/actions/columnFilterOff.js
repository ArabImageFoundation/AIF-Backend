export const COLUMN_FILTER_OFF = 'COLUMN_FILTER_OFF';

export function columnFilterOff(columnId=0){
	return {
		type: COLUMN_FILTER_OFF
	,	columnId
	}
}