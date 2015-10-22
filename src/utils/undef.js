export function def(prop){
	return !undef(prop);
}

export function undef(prop){
	return (typeof prop === 'undefined');
}