import triggerEvent from './triggerEvent';
import subStoreDidEmitEvent from './subStoreDidEmitEvent';
import getStoreInitialState from './getStoreInitialState';
import setStoreOptions from './setStoreOptions';
import Store from './Store';

export default function storeMaker(storeName,fns,cb){

	let store = new Store(storeName,fns,cb);
	let meta = store.meta;

	function trigger(evt){
		return triggerEvent(store,meta,cb,evt);
	}

	function child_did_emit_event(type,evt,subMeta){
		return subStoreDidEmitEvent(meta,trigger,type,evt,subMeta)
	}

	function initialize(callback,recursive){
		return getStoreInitialState(store,meta,cb,trigger,fns.data,callback,recursive)
	}

	setStoreOptions(fns,store,meta,trigger,cb,child_did_emit_event)

	return initialize;
}