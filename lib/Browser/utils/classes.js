import {undef} from './undef';

function mapClassNames(style,className,props,additional){
	let classNames = style[className] ? [style[className]] : [];
	if(additional){
		if(Array.isArray(additional)){
			classNames = classNames.concat(additional);
		}else{
			classNames.push(additional);
		}
	}
	/** debug */
	className && classNames.push(className);
	/**/
	if(props && props !== true){
		for(let n in style){
			if(!Object.prototype.hasOwnProperty.call(props,n)){continue;}
			if(style[n] && props[n]){classNames.push(style[n]);}
		}
	}
	return classNames.join(' ')
}

export default function cx({style,className,props,additional}){
	const defs = {
		style
	,	className
	,	props
	,	additional
	}
	return function curried(className,args){
		if(typeof className!=='string'){
			args = className;
			className = ((args && args.className) || defs.className);
		}
		const {
			style
		,	props
		,	additional
		} = Object.assign({},defs,args);
		return mapClassNames(style,className,props,additional);
	}
}