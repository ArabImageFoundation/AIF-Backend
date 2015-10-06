import React,{Component,PropTypes} from 'react';
import {objMap} from '../../utils';

function processOne({
	atime
,	basename
,	birthtime
,	dirname
,	extension
,	filename
,	files
,	isDirectory
,	isFile
,	isInvalidated
,	mime
,	path
,	size
,	status
,	types
}){
	return {
		atime
	,	basename
	,	size
	}
}

function processMultiple(items){
	const ret = {
		size:0
	}
	items.forEach(item=>{
		ret.size+=item.file.size
	});
	return ret;
}


function processItems(marked,selected){
	if(!marked || !marked.length){return selected && selected.file ? processOne(selected.file):false;};
	if(marked.length==1){return marked[0].file ? processOne(marked[0].file):false}
	return processMultiple(marked);
}

export default class InfoPane extends Component{
	render(){
		const {marked,selected} = this.props
		const props = objMap(processItems(marked,selected),(value,key,i)=>{
			return (<span key={i}><dt>{key}</dt><dd>{value}</dd></span>)
		})
		return (<div>
			<dl>
				{props}
			</dl>
		</div>)
	}
}