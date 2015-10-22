import eventName from './eventName';

export default function removeEventListener(meta,evt,fn){
	let {name,events} = meta;
	evt = eventName(name,evt);
	if(!events[evt]){return;}
	index = (typeof fn == 'function') ? events[evt].indexOf(fn) : fn;
	if(index<0){return;}
	events.splice(index,1);
}