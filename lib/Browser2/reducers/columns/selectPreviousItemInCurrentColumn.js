import selectItemInColumnRelativeTo from './utils/selectItemInColumnRelativeTo';

export function selectPreviousItemInCurrentColumn(state,action){
	return selectItemInColumnRelativeTo(state,action,-1)
}