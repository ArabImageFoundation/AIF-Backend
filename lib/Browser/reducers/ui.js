import {FOCUS_IN,FOCUS_OUT} from '../actions/ui';

const defUI = {
	focused:false
}

export function ui(state=defUI,action){
	switch(action.type){
		case FOCUS_IN: 
			return state.focused!=true ? Object.assign({},state,{focused:true}) : state;
		case FOCUS_OUT: 
			return state.focused!=false ? Object.assign({},state,{focused:false}) : state;
		default:
			return state;
	}
	return state;
}