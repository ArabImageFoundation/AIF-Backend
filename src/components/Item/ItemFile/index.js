import React,{Component,PropTypes} from 'react';


module.exports = class ItemFile extends Component{
	render(){
		const {
			path
		,	type
		,	selected
		,	marked
		,	file
		,	onClick
		,	onDoubleClick
		} = this.props;
		/**
		const {
			basename
		,	filename
			atime
		,	birthtime
		,	dirname
		,	extension
		,	isDirectory
		,	isFile
		,	mime
		,	size
		,	status
		,	types
		} = file;
		**/
		return (<span>{name}</span>)
	}
}
