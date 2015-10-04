export const SELECT_ITEM = 'SELECT_ITEM';

export function selectItem(columnId=0,itemId){
	return {
		type: SELECT_ITEM
	,	columnId
	,	itemId
	}
}