import React,{Component,PropTypes} from 'react';
import {selectItem,markItem,runItem} from '../../actions';

import ItemDirectory from './ItemDirectory';
import ItemGroup from './ItemGroup';
import ItemFile from './ItemFile';
import ItemUnknown from './ItemUnknown';

import{
	TYPE_DIRECTORY
,	TYPE_FILE
,	TYPE_UNKNOWN
,	TYPE_GROUP
} from '../../constants/types';


const map = {
	[TYPE_DIRECTORY]:ItemDirectory
,	[TYPE_FILE]:ItemFile
,	[TYPE_GROUP]:ItemGroup
}

export default class Item extends Component{
	onDoubleClick = (evt) => {
		evt.preventDefault();
		const {
			dispatch
		,	columnId
		,	id
		,	type
		,	path
		} = this.props
		dispatch(runItem(path,columnId,type,null,id));
	}
	onClick = (evt) => {
		evt.preventDefault();
		const ctrl = evt.ctrlKey;
		const {
			dispatch
		,	columnId
		,	id
		,	type
		} = this.props
		if(ctrl){
			dispatch(markItem(columnId,id))
		}else{
			dispatch(selectItem(columnId,id))
		}
	}
	render(){
		const {type} = this.props;
		const Component = map[type] || ItemUnknown;
		const {onClick,onDoubleClick} = this;
		const name = (this.props.name || this.props.path || '').replace(/^\/|\/$/g,'').split('/').pop();
		const props = Object.assign({},this.props,{onClick,onDoubleClick,name});
		return (<Component {...props}/>)
	}
}