import Immutable from 'immutable';
import C from './constants';

export default function makeStoreMethod(fn,name,meta,trigger,cb){

	function done(newState){
		if(typeof newState !== 'undefined' && !Immutable.is(newState,meta.state)){
			meta.state = newState;
			cb && cb(C.END,name);
			trigger(name);
		}
	}
	return function process(...args){
		cb && cb(C.START,name)
		fn(meta.state,done,...args);
	}
}