import Immutable from 'immutable';
import C from './constants';

export default function getStoreInitialState(store,meta,cb,trigger,initialStateFunction,callback,recursive){
	if(typeof recursive !== false){recursive = true;}
	let {isInitializing,initialized,stores,state} = meta;
	if(isInitializing || initialized){return store;}
	if(cb){cb(C.START,'initialized');}
	let length = (recursive ? stores.length : 0) + 1;
	let subStates;
	function done(){
		length --;
		if(length>0){return;}
		meta.initialized = true;
		state = Immutable.fromJS(state || {});
		if(subStates){state = state.mergeDeep(subStates);}
		meta.state = state;
		if(cb){cb(C.END,'initialized');}
		trigger('initialized');
		callback && callback(store,state);
	}
	isInitializing = true;
	if(recursive){
		subStates = Immutable.Map({});
		stores.forEach((storeName)=>{
			let subStore = store[storeName];
			subStore((_subStore,_subState)=>{
				store[storeName] = _subStore;
				subStates = subStates.setIn([storeName],_subState);
				done();
			},recursive);
		});
	}
	if(!initialStateFunction){
		done();
	}else{		
		initialStateFunction(function(newState){
			state = newState;
			done();
		});
	}
}