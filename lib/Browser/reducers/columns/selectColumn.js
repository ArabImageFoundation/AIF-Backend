import {selectColumnAndDeselectOthers} from './utils/selectColumnAndDeselectOthers';
import {getSelectedColumnIndex} from './utils/getSelectedColumnIndex';

export function selectColumn(state,action){
	return selectColumnAndDeselectOthers(state,action.columnId);
}