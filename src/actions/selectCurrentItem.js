export const SELECT_CURRENT_ITEM = 'SELECT_CURRENT_ITEM';

export function selectCurrentItem(columnId=0){
	return {
		type: SELECT_CURRENT_ITEM
	,	columnId
	}
}