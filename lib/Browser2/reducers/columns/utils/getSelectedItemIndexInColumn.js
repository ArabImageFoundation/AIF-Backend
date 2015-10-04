export function getSelectedItemIndexInColumn(column,action){
	const index = column.items.findIndex(item=>item.selected)
	if(index<0){return false;}
	return index;
}