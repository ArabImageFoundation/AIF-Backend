function define(obj,prop,value){
	Object.defineProperty(obj,prop,{
		enumerable:false
	,	value
	,	writable:true
	})
}

function defineResultObject(){
	var res = {};
	define(res,'length',0);
	define(res,'indexes',[]);
	return res;
}

function appendResult(obj,index,result){
	obj[index] = result;
	obj.indexes.push(index);
	obj.length++;
}

export default function forEach(arr,fn,cb){
	const length = arr.length
	const res = defineResultObject();
	const errs = defineResultObject();
	let hasErrs = false;
	let index = 0;
	let doneCalled = false;
	function done(){
		if(doneCalled){return;}
		doneCalled = true;
		if(hasErrs){return cb(errs,res);}
		return cb(null,res);
	}
	function next(err,result,interrupt){
		if(err){
			hasErrs=true;
			appendResult(errs,index,err);
		}
		if(typeof result!=='undefined'){
			appendResult(res,index,result);
		}
		index+=1;
		if(interrupt || index>=length){return done();}
		fn(arr[index],next);
	}
	fn(arr[index],next);
}