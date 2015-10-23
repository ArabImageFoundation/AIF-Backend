import React,{Component,PropTypes} from 'react';

import {
	LayoutColumn
,	LayoutColumnHeader
,	LayoutColumnItems
,	LayoutColumnItem
,	LayoutColumns
,	LayoutContainer
,	LayoutInfoPane
} from '../../Layout';

export default class ItemFile extends Component{
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
		const props = {
			selected
		,	type
		,	marked
		,	onClick
		,	onDoubleClick
		}
		const name = (this.props.name || (this.props.file && this.props.file.filename) || path).split('/').pop();
		return (<LayoutColumnItem {...props}>
			{name}
		</LayoutColumnItem>)	
	}
}