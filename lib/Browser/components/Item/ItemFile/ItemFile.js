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

export default class ItemFile extends Component{
	onClick = (evt) => {
		evt.preventDefault();
		const ctrl = evt.ctrlKey;
		const {
			dispatch
		,	columnId
		,	id
		,	type
		} = this.props
		if(ctrl){
			dispatch(markItem(columnId,id))
		}else{
			dispatch(selectItem(columnId,id))
		}
	}
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
			{path}
		</LayoutColumnItem>)	
	}
}