import React,{Component,PropTypes} from 'react';
import {fetchFileIfNeeded} from '../../../actions';
import InfoPane from '../../InfoPane'

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

export default class FileColumn extends Component{
	componentDidMount(){
		const {
			dispatch
		,	path
		,	id
		} = this.props;
		dispatch(fetchFileIfNeeded(path,id));
	}
	renderLoading(){
		return <div>loading</div>
	}
	renderLoaded(headerHeight,height,file){
		const {
			size
		} = file;
		return (<LayoutColumnItems height={height-headerHeight} position={headerHeight}>
			size:{size}
		</LayoutColumnItems>)
	}
	renderInside(headerHeight,height,file){
		if(file){return this.renderLoaded(headerHeight,height,file)}
		return this.renderLoading();
	}
	renderItems(items){
		
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
		,	file
		,	status
		} = this.props;
		const headerHeight = getHeaderHeight(height);
		const props = {
			selected
		}
		return(<LayoutColumn {...props}>
			<LayoutColumnHeader height={headerHeight} closeColumn={id!=0?this.closeColumn:null}>{path}</LayoutColumnHeader>
			{this.renderInside(headerHeight,height,file)}
		</LayoutColumn>)
	}
}