import React,{Component,PropTypes} from 'react';
import {runItem} from '../../../actions';

import {
	LayoutColumn
,	LayoutColumnHeader
,	LayoutColumnItems
,	LayoutColumnItem
,	LayoutColumns
,	LayoutContainer
,	LayoutInfoPane
} from '../../Layout';

export default class ItemDirectory extends Component{
	onDoubleClick = (evt) => {
		evt.preventDefault();
		const {
			dispatch
		,	columnId
		,	id
		,	type
		,	path
		} = this.props
		dispatch(runItem(path,columnId,type,null,id));
	}
	render(){
		const {
			path
		,	type
		,	selected
		,	marked
		,	file
		,	onClick
		,	name
		} = this.props;
		/**
		const {
			basename
		,	atime
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
		**/
		const props = {
			selected
		,	type
		,	marked
		,	onClick
		,	onDoubleClick:this.onDoubleClick
		}
		return (<LayoutColumnItem {...props}>
			{name}/
		</LayoutColumnItem>)
	}
}