import markItemInColumnRelativeTo from './utils/markItemInColumnRelativeTo';

export function markNextItemInCurrentColumn(state,action){
	return markItemInColumnRelativeTo(state,action,1)
}