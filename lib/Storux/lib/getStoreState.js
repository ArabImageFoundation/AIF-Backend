import Immutable from 'immutable';

export default function getStoreState(meta,store,raw){
	meta.dirty = false;
	let {stores,state} = meta;
	stores.forEach((storeName)=>{
		let subStore = store[storeName];
		//if(!subStore.isDirty()){return;}
		let subState = subStore.getState(true);
		if(!Immutable.is(state.getIn([storeName]),subState)){
			meta.state = state.setIn(storeName,subState);
		}
	});
	return raw ? state : state.toJS();
}