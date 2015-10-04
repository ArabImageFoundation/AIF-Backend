import {getColumnIndex} from './utils/getColumnIndex'

export function removeColumn(state,action,pos=0){
	let _pos = getColumnIndex(state,action);
	if(_pos<0){return state;}
	let wasSelected = false;
	let length = state.length
	for(let i=_pos;i<=length;i++){
		if(state[i].selected){
			wasSelected = true;
			break;
		}
	}
	let cutOff = _pos+pos;
	if(cutOff>=state.length){return state;}
	const _state = state.slice(0,cutOff);
	if(wasSelected){
		_state[_state.length-1].selected = true;
	}
	return _state;
}