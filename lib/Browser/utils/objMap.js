import objForEach from './objForEach';

export default function objMap(obj,fn){
	const arr = [];
	objForEach(obj,function(element,name,index,rObj){
		arr.push(fn(element,name,index,obj));
	});
	return arr;
}