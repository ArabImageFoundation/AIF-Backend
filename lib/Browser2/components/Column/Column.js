import React,{Component,PropTypes} from 'react';
import {fetchDirectoryIfNeeded} from '../../actions/api/directories';
import {selectColumn,removeColumn} from '../../actions/ui/columns';
import Item from '../Item';

import {
	LayoutColumn
,	LayoutColumnHeader
,	LayoutColumnItems
,	LayoutColumnItem
,	LayoutColumns
,	LayoutContainer
,	LayoutInfoPane
} from '../Layout';

function getHeaderHeight(height){
	if(height<100){return 0;}
	if(height<200){return 20;}
	return 30;
}

export default class Column extends Component{
	onClick = (evt) => {
		evt.preventDefault();
		const {
			dispatch
		,	id
		} = this.props;
		dispatch(selectColumn(id));
	}
	closeColumn = (evt) => {
		evt.preventDefault();
		const {
			dispatch
		,	id
		} = this.props;
		dispatch(removeColumn(id));
	}
	componentDidMount(){
		const {
			dispatch
		,	path
		,	id
		} = this.props;
		dispatch(fetchDirectoryIfNeeded(path,id));
	}
	renderItems(items){
		return (items && items.map((item,key)=>this.makeItem(item,key))) || false
	}
	makeItem(item,key){
		const {
			dispatch
		,	id
		} = this.props
		const props = Object.assign({},item,{
			dispatch
		,	key
		,	columnId:id
		});
		return <Item {...props}/>
	}
	render(){
		const {path,items,height,dispatch,selected,id} = this.props;
		const headerHeight = getHeaderHeight(height);
		const props = {
			selected
		,	onClick:this.onClick
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