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


function processItems(files){
	if(!files || !files.length){return null};
	if(files.length==1){return processOne(files[0].file)}
	return processMultiple(files);
}

export default class InfoPane extends Component{
	render(){
		const props = objMap(processItems(this.props.items),(value,key,i)=>{
			return (<span key={i}><dt>{key}</dt><dd>{value}</dd></span>)
		})
		return (<div>
			<dl>
				{props}
			</dl>
		</div>)
	}
}