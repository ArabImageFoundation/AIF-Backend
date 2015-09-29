function has(obj,property){
	return Object.hasOwnProperty.call(obj,property);
}

export default function forEach(obj,fn){
	let index = 0;
	for(let name in obj){
		if(!has(obj,name)){continue;}
		let element = obj[name];
		fn(element,name,index,obj);
		index++;
	}
}