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
} from '../../../constants/types'

const items = {

}

export default class DirectoryColumn extends Component{
	renderItems(){
		return [
			makeItem({
				path:'/'
			,	type:TYPE_DIRECTORY
			},'files',this.props)
		]
	}
	render(){
		const {path,onClick,height,dispatch,selected,id} = this.props;
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