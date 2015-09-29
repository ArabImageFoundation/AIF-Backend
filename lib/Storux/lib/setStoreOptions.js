import makeStoreMethod from './makeStoreMethod';
import makeSubStore from './makeSubStore';

export default function setStoreOptions(fns,store,meta,trigger,cb,child_did_emit_event){
	for(let name in fns){
		if(name == 'data'){continue;}
		if(typeof fns[name] === 'function'){
			store[name] = makeStoreMethod(fns[name],name,meta,trigger,cb);
		}else{
			store[name] = makeSubStore(fns[name],name,meta.stores,child_did_emit_event)
		}
	}
}