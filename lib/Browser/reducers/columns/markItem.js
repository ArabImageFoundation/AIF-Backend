import {markItemInColumn} from './utils/markItemInColumn';

export function markItem(state,action){
	const {columnId,itemId} = action;
	if(itemId<0){return state;}
	return state.map(column=>
		(column.id == columnId && column.items && itemId<=column.items.length) ?
			Object.assign({},column,markItemInColumn(column,itemId)) :
			column
	);
}