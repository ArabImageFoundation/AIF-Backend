import React,{Component,PropTypes} from 'react';
import {
	LayoutColumn
,	LayoutColumnHeader
,	LayoutColumnItems
,	LayoutColumnItem
,	LayoutColumns
,	LayoutContainer
,	LayoutInfoPane
,	getHeaderHeight
,	makeItem
} from '../common';
import{
	TYPE_DIRECTORY
,	TYPE_FILE
,	TYPE_UNKNOWN
,	TYPE_FIRST
,	TYPE_GROUP
} from '../../../constants/types';

export default class DirectoryColumn extends Component{
	renderItems(items){
		return (items && items.map((item,key)=>makeItem(item,key,this.props))) || false
	}
	render(){
		const {path,onClick,height,dispatch,selected,id,items} = this.props;
		const headerHeight = getHeaderHeight(height);
		const props = {
			selected
		,	onClick
		};
		return(<LayoutColumn {...props}>
			<LayoutColumnHeader height={headerHeight} closeColumn={id!=0?this.closeColumn:null}>{path}</LayoutColumnHeader>
			<LayoutColumnItems height={height-headerHeight} position={headerHeight}>
				{this.renderItems(items)}
			</LayoutColumnItems>
		</LayoutColumn>)
	}
}