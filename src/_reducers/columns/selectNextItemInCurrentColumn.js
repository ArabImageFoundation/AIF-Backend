import {selectItemInColumnRelativeTo} from './utils/selectItemInColumnRelativeTo';

export function selectNextItemInCurrentColumn(state,action){
	return selectItemInColumnRelativeTo(state,action,1)
}