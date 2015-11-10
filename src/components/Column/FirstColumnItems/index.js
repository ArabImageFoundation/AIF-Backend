import React,{Component,PropTypes} from 'react';
import {fetchRootGroups} from '../../../actions';
import ColumnItems from '../../ColumnItems';

module.exports =  class FirstColumnItems extends Component{
	componentDidMount(){
		const {
			dispatch
		,	id
		} = this.props;
		dispatch(fetchRootGroups(id));
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
