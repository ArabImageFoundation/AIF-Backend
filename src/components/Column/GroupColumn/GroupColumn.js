import React,{Component,PropTypes} from 'react';
import {fetchGroupIfNeeded,filterColumn} from '../../../actions';
import {STATUS_ERROR} from '../../../constants/statuses';

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
		dispatch(fetchGroupIfNeeded(path,id));
	}
	onFilter = (evt)=>{
		const {
			dispatch
		,	id
		} = this.props;
		dispatch(filterColumn(id,evt.target.value));
	}
	renderItems(items){
		return (items && items.map((item,key)=>item.hidden?false:makeItem(item,key,this.props))) || false
	}
	render(){
		const {
			path
		,	onClick
		,	items
		,	height
		,	dispatch
		,	selected
		,	id
		,	filter
		,	status
		,	showFilter
		} = this.props;
		const headerHeight = getHeaderHeight(height);
		const props = {
			selected
		,	onClick
		};
		if(status == STATUS_ERROR){
			return (<LayoutColumn {...props}>Error!</LayoutColumn>)
		}
		const headerProps = {
			height:headerHeight
		,	closeColumn:id!=0?this.closeColumn:null
		,	filter
		,	onChange:this.onFilter
		,	showFilter:true
		}
		return(<LayoutColumn {...props}>
			<LayoutColumnHeader {...headerProps}>{path}/{filter?`[${filter}]`:''}</LayoutColumnHeader>
			<LayoutColumnItems height={height-headerHeight} position={headerHeight}>
				{this.renderItems(items)}
			</LayoutColumnItems>
		</LayoutColumn>)
	}
}