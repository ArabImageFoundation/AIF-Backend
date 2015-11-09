import {getSelectedColumnIndex} from './getSelectedColumnIndex';

export function toggleCurrentColumn(state,prop){
	const columnIndex = getSelectedColumnIndex(state);
	const column = Object.assign({},state[columnIndex],{[prop]:!!!state[columnIndex][prop]});
	const _state = state.slice();
	_state.splice(columnIndex,1,column);
	return _state
}