import C from './constants';
import eventName from './eventName';

export default function triggerEvent(store,meta,cb,evt){
	meta.dirty = true;
	let {name,events} = meta;
	evt = eventName(name,evt);
	let globalEventName = eventName(name,'*')
	if((events[evt] && events[evt].length) || (events[globalEventName] && events[globalEventName].length)){
		let _s = meta.state.toJS();
		event(events[evt],store,_s);
		event(events[globalEventName],store,_s);
	}
	if(cb){cb(C.EVENT,evt,meta);}
}

function event(events,store,state){
	events && events.forEach(fn=>fn(state,store));
}