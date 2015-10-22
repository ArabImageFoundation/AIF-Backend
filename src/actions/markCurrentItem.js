export const MARK_CURRENT_ITEM = 'MARK_CURRENT_ITEM';

export function markCurrentItem(columnId=0){
	return {
		type: MARK_CURRENT_ITEM
	,	columnId
	}
}