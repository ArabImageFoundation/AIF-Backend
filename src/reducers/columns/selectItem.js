import {selectItemInColumn} from './utils/selectItemInColumn';

export function selectItem(state,action){
	const {columnId,itemId} = action;
	if(itemId<0){return state;}
	return state.map(column=>
		(column.id == columnId && column.items && itemId<=column.items.length) ?
			Object.assign({},column,selectItemInColumn(column,itemId)) :
			column
	);
}