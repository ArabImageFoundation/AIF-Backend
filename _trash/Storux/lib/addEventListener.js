import eventName from './eventName';

export default function addEventListener(meta,evt,fn){
	let {name,events} = meta;
	evt = eventName(name,evt);
	events[evt] = events[evt] || [];
	events[evt].push(fn);
}