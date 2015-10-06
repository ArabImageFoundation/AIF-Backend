import {defaultState} from './defaults/state';

export function groups(state=defaultState,action){
	switch(action.type){
		case 5:
			return false;
		default:
			return state;
	}
}