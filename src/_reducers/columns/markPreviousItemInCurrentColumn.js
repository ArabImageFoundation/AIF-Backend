import markItemInColumnRelativeTo from './utils/markItemInColumnRelativeTo';

export function markPreviousItemInCurrentColumn(state,action){
	return markItemInColumnRelativeTo(state,action,-1)
}