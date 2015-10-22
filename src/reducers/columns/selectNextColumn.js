import {selectColumnAndDeselectOthers} from './utils/selectColumnAndDeselectOthers';
import {getSelectedColumnIndex} from './utils/getSelectedColumnIndex';

export function selectNextColumn(state,action){
	const index = getSelectedColumnIndex(state)+1;
	return selectColumnAndDeselectOthers(state,index);
}