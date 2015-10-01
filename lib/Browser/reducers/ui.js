import {FOCUS_IN,FOCUS_OUT} from '../actions/ui';

const defUI = {
	focused:false
}

const focusedTrue = {focused:true};
const focusedFalse = {focused:false};

export function ui(state=defUI,action){
	switch(action.type){
		case FOCUS_IN: 
			return state.focused!=true ? Object.assign({},state,focusedTrue) : state;
		case FOCUS_OUT: 
			return state.focused!=false ? Object.assign({},state,focusedFalse) : state;
		default:
			return state
	}
	return state;
}