import getSelectedItemIndexInColumn from './getSelectedItemIndexInColumn';
import getSelectedColumnIndex from './getSelectedColumnIndex';
import selectItemInColumn from './selectItemInColumn';

export function selectItemInColumnRelativeTo(state,action,nextPos=0){
	const {columnId} = action;
	const columnIndex = getSelectedColumnIndex(state);
	const column = state[columnIndex];
	const itemIndex = getSelectedItemIndexInColumn(column);
	const nextIndex = itemIndex+nextPos;
	if(nextIndex>column.items){return state;}
	const newColumn = Object.assign({},column,selectItemInColumn(column,nextIndex))
	return state.slice().splice(columnIndex,1,newColumn)
}