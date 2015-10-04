export const MARK_ITEM = 'MARK_ITEM';

export function markItem(columnId=0,itemId){
	return {
		type: MARK_ITEM
	,	columnId
	,	itemId
	}
}