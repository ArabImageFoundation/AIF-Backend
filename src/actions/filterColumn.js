export const FILTER_COLUMN = 'FILTER_COLUMN';

export function filterColumn(columnId,filter){
	return {
		type:FILTER_COLUMN
	,	columnId
	,	filter
	}
}