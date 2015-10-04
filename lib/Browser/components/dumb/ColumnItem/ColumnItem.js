import React,{Component} from 'react';
import ReactDOM from 'react-dom';
const cx = require('../../../utils/classes')({
	style:require('./style')
,	className:'ColumnItem'
});

export default class Item extends Component{
	handleClick = (evt) => {
		this.props.onClick(evt);
	}
	onKeyUp = (evt) => {
		this.props.onKeyUp && this.props.onKeyUp(evt);
	}
	focus(){
		let {item} = this.refs;
		item && item.focus();
	}
	render(){
		const {
			selected
		,	focused
		,	title
		,	tabIndex
		,	children
		} = this.props;
		const props = {
			className:cx({props:{selected,focused}})
		,	onClick:this.handleClick
		,	onKeyUp:this.onKeyUp
		,	title:title || ''
		,	tabIndex:tabIndex || 0
		,	ref:'item'
		};
		return (<a {...props}>{children}</a>)
	}
};