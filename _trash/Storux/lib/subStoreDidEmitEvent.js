import C from './constants';

export default function subStoreDidEmitEvent(meta,trigger,type,evt,subMeta){
	if(type == C.EVENT){
		meta.state && (meta.state = meta.state.setIn([subMeta.name],subMeta.state));
		trigger(evt);
	}
	else if(type == C.START){
		meta.processing = true;
	}
	else if(type == C.END){
		meta.processing = false;
	}
}