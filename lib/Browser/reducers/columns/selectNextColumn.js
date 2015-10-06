import {selectColumnAndDeselectOthers} from './utils/selectColumnAndDeselectOthers';
import {getSelectedColumnIndex} from './utils/getSelectedColumnIndex';

export function selectColumn(state,action){
	const index = getSelectedColumnIndex(state)+1;
	return selectColumnAndDeselectOthers(state,index);
}