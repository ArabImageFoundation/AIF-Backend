import React,{Component,PropTypes} from 'react';
import {fetchDirectoryIfNeeded} from '../../../actions/api/directories';
import {selectColumn,removeColumn} from '../../../actions/ui/columns';
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

export default class DirectoryColumn extends Component{
	componentDidMount(){
		const {
			dispatch
		,	path
		,	id
		} = this.props;
		dispatch(fetchDirectoryIfNeeded(path,id));
	}
	renderItems(items){
		return (items && items.map((item,key)=>makeItem(item,key,this.props))) || false
	}
	render(){
		const {path,onClick,items,height,dispatch,selected,id} = this.props;
		const headerHeight = getHeaderHeight(height);
		const props = {
			selected
		,	onClick
		};
		return(<LayoutColumn {...props}>
			<LayoutColumnHeader height={headerHeight} closeColumn={id!=0?this.closeColumn:null}>{path}</LayoutColumnHeader>
			<LayoutColumnItems height={height-headerHeight} position={headerHeight}>
				{this.renderItems(items)}
				{this.renderItems(items)}
				{this.renderItems(items)}
			</LayoutColumnItems>
		</LayoutColumn>)
	}
}