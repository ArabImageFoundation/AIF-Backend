import React,{Component,PropTypes} from 'react';
import {addColumn} from '../../../actions';

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
	onDoubleClick = (evt) => {
		evt.preventDefault();
		console.log(this.props)
		const {
			dispatch
		,	columnId
		,	id
		,	type
		,	path
		} = this.props
		dispatch(addColumn(path,columnId,type,null,id));
	}
	render(){
		const {
			path
		,	type
		,	selected
		,	marked
		,	file
		,	onClick
		} = this.props;
		const {
			basename
		/**
			atime
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
		**/
		} = file;
		const props = {
			selected
		,	type
		,	marked
		,	onClick
		,	onDoubleClick:this.onDoubleClick
		}
		return (<LayoutColumnItem {...props}>
			{basename}
		</LayoutColumnItem>)	
	}
}