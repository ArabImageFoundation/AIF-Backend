import React,{Component,PropTypes} from 'react';
import {addColumn} from '../actions/columns';
import {TYPE_DIRECTORY,TYPE_INFO,TYPE_FILE} from '../constants';
import {KEY_ENTER} from '../constants';
import Item from './dumb/ColumnItem';

var undef;

export default class ItemController extends Component{
	static propTypes = {
		dispatch:PropTypes.func.isRequired
	,	columnId:PropTypes.any.isRequired
	,	path:PropTypes.string.isRequired
	,	type:PropTypes.string.isRequired
	,	label:PropTypes.string
	,	actionName:PropTypes.string
	,	selected:PropTypes.bool
	,	focused:PropTypes.bool
	,	id:PropTypes.any
	,	onClick:PropTypes.func
	}
	focus(){
		const {focused} = this.props;
		const {item} = this.refs;
		if(focused && item){
			item.focus();
		}
	}
	componentDidMount(){
		this.focus();
	}
	componentDidUpdate(){
		this.focus();
	}
	select(){
		if(this.props.onClick){
			return this.props.onClick(evt);
		}
		const {
			dispatch
		,	columnId
		,	path
		,	type
		,	actionName
		,	id
		} = this.props;
		dispatch(addColumn(path,columnId,type,actionName,id));
	}
	onKeyUp = (evt) =>{
		const {focused} = this.props;
		if(focused && evt.keyCode == KEY_ENTER){
			this.select();
		}
	}
	handleClick = (evt) => {
		this.select();
	}
	inside(){
		return (this.props.label || this.props.children)
	}
	render(){
		const inside = this.inside();
		const {selected,focused,id} = this.props;
		const props = {
			onClick:this.handleClick
		,	onKeyUp:focused ? this.onKeyUp : undef
		,	title:inside
		,	tabIndex:id
		,	selected
		,	focused
		}
		return (<Item {...props} ref="item">
			{inside}
		</Item>)
	}
};