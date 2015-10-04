import objForEach from './objForEach';

const empty = [];

export default function objToArray(obj,fn){
	if(!obj){return empty};
	const arr = [];
	objForEach(obj,function(element,name,index,rObj){
		arr.push(element);
	});
	return arr;
}