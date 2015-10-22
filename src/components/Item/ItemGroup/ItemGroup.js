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

export default class ItemGroup extends Component{
	render(){
		const {
			path
		,	type
		,	selected
		,	marked
		,	file
		} = this.props;
		const {
			atime
		,	basename
		,	birthtime
		,	dirname
		,	extension
		,	filename
		,	isDirectory
		,	isFile
		,	mime
		,	size
		,	status
		,	types
		} = file;
		const props = {
			selected
		,	type
		,	marked
		,	onClick:this.onClick
		,	onDoubleClick:this.onDoubleClick
		}
		return (<LayoutColumnItem {...props}>
			{path}
		</LayoutColumnItem>)	
	}
}