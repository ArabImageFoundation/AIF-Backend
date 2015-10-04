export const FOCUS_IN = 'FOCUS_IN';
export const FOCUS_OUT = 'FOCUS_OUT';
export const PATH_CHANGE = 'PATH_CHANGE';

export function focusIn(){
	return {
		type:FOCUS_IN
	}
}

export function focusOut(){
	return {
		type:FOCUS_OUT
	}
}

export function pathChange(path){
	return {
		type:PATH_CHANGE
	,	path
	}
}