import storeMaker from './storeMaker';

export default function makeSubStore(opts,name,stores,child_did_emit_event){
	let subStore = storeMaker(name,opts,child_did_emit_event);
	stores.push(name);
	return subStore;
}