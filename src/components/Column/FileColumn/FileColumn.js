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
	renderItems(items){
		
	}
	render(){
		const {path,onClick,items,height,dispatch,selected,id,file} = this.props;
		const headerHeight = getHeaderHeight(height);
		const props = {
			selected
		,	onClick
		};
		return(<LayoutColumn {...props}>
			<LayoutColumnHeader height={headerHeight} closeColumn={id!=0?this.closeColumn:null}>{path}</LayoutColumnHeader>
			<LayoutColumnItems height={height-headerHeight} position={headerHeight}>
				<InfoPane selected={this.props}/>
			</LayoutColumnItems>
		</LayoutColumn>)
	}
}