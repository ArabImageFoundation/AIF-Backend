import {undef} from './undef'

export default function mix(defProps,...otherProps){
	const ret = {};
	for(let n in defProps){
		if(!Object.prototype.hasOwnProperty.call(defProps,n)){continue;}
		if(n==='children'){continue;}
		ret[n] = defProps[n];
	}
	var i = 0, l = otherProps.length;
	while(i<l){
		let props = otherProps[i++];
		for(let n in props){
			if(undef(ret[n])){
				ret[n]=props[n];
				continue;
			}
			if(n==='className'){
				ret.className = defProps.className+' '+props.className;
				continue;
			}
			if(n==='style'){
				ret.style = Object.assign({},defProps.style,props.style)
				continue;
			}
			ret[n] = props[n];
		}
	}
	return ret;
}