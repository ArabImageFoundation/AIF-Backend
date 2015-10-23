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
		,	onClick
		,	onDoubleClick
		} = this.props;
		const props = {
			selected
		,	type
		,	marked
		,	onClick
		,	onDoubleClick
		}
		return (<LayoutColumnItem {...props}>
			{path}
		</LayoutColumnItem>)	
	}
}