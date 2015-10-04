export function getSelectedColumnIndex(state){
	const index = state.findIndex(column=>column.selected)
	if(index<0){return false;}
	return index;
}