export default function arrForEach(arr,fn){
	const length = arr.length;
	var i = 0;
	for(i;i<length;i++){
		let element = arr[i];
		let ret = fn(element,i,arr);
		if(ret === false){return;}
	}
}