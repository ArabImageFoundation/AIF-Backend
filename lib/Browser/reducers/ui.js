import {
	FOCUS_IN
,	FOCUS_OUT
,	PATH_CHANGE
} from '../actions/ui';

const defUI = {
	focused:false
,	path:'/'
}

const focusedTrue = {focused:true};
const focusedFalse = {focused:false};

export function ui(state=defUI,action){
	switch(action.type){
		case FOCUS_IN: 
			return state.focused!=true ? Object.assign({},state,focusedTrue) : state;
		case FOCUS_OUT: 
			return state.focused!=false ? Object.assign({},state,focusedFalse) : state;
		case PATH_CHANGE:
			return state.path!=action.path ? Object.assign({},state,{path:action.path}) : state;
		default:
			return state
	}
	return state;
}