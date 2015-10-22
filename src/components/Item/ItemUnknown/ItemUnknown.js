import React,{Component,PropTypes} from 'react';

import{
	TYPE_UNKNOWN
} from '../../../constants/types';
import {
	LayoutColumn
,	LayoutColumnHeader
,	LayoutColumnItems
,	LayoutColumnItem
,	LayoutColumns
,	LayoutContainer
,	LayoutInfoPane
} from '../../Layout';

export default class ItemUnknown extends Component{
	render(){
		const text = this.path || this.name || '?'
		const props = {
			selected:false
		,	type:TYPE_UNKNOWN
		,	marked:false
		}
		return (<LayoutColumnItem {...props}>
			{text}
		</LayoutColumnItem>)	
	}
}