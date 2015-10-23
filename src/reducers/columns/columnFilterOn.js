import {getSelectedColumnIndex} from './utils/getSelectedColumnIndex';

const showFilter = {showFilter:true};

export function columnFilterOn(state,action){
	const columnIndex = getSelectedColumnIndex(state);
	const column = Object.assign({},state[columnIndex],showFilter);
	const _state = state.slice();
	_state.splice(columnIndex,1,column);
	return _state
}