import objForEach from './objForEach';

export default function objToArray(obj,fn){
	const arr = [];
	objForEach(obj,function(element,name,index,rObj){
		arr.push(element);
	});
	return arr;
}