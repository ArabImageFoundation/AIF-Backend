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
} from '../common';


export default function ErrorColumn({id,height,selected,onClick}){
	const headerHeight = getHeaderHeight(height);
	const props = {selected,onClick}
	return(<LayoutColumn {...props}>
		<LayoutColumnHeader height={headerHeight} closeColumn={id!=0?this.closeColumn:null}>Error</LayoutColumnHeader>
		<LayoutColumnItems height={height-headerHeight} position={headerHeight}>
			Error!
		</LayoutColumnItems>
	</LayoutColumn>)
}