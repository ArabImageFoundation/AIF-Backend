import React,{Component,PropTypes} from 'react';
import {selectItem,markItem} from '../../../actions/ui/items';
import {addColumn} from '../../../actions/ui/columns';

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
		/**
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
		**/
		const props = {
			selected
		,	type
		,	marked
		,	onClick
		,	onDoubleClick:this.onDoubleClick
		}
		return (<LayoutColumnItem {...props}>
			{path}/
		</LayoutColumnItem>)
	}
}