import React,{Component,PropTypes} from 'react';
import {runItem} from '../../../actions';


export default class ItemDirectory extends Component{
	render(){
		const {
			path
		,	type
		,	selected
		,	marked
		,	file
		,	onClick
		,	onDoubleClick
		,	name
		} = this.props;
		return (<span>{name}</span>)
	}
}
