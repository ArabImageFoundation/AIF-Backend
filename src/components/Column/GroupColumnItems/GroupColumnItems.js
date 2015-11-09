import React,{Component,PropTypes} from 'react';
import {fetchDirectoryIfNeeded,filterColumn} from '../../../actions';
import ColumnItems from '../../ColumnItems';

export default class GroupColumnItems extends Component{
	componentDidMount(){
		const {
			dispatch
		,	path
		,	id
		} = this.props;
		dispatch(fetchGroupIfNeeded(path,id));
	}
	render(){
		const {
			items
		,	height
		,	headerHeight
		,	renderItems
		} = this.props;

		const props = {
			items:renderItems(items,this.props)
		,	height:height-headerHeight
		,	position:headerHeight
		}
		return(<ColumnItems {...props}/>);
	}
}
