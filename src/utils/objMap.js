import objForEach from './objForEach';

const empty = [];

export default function objMap(obj,fn){
	if(!obj){return empty};
	const arr = [];
	objForEach(obj,function(element,name,index,rObj){
		arr.push(fn(element,name,index,obj));
	});
	return arr;
}