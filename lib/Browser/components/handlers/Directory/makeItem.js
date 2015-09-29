import {TYPE_FILE,TYPE_DIRECTORY} from '../../../constants';
import ItemController from '../../ItemController';
import React from 'react';

export default function item(item,key,props){
	const {dispatch,id,selectedItem} = props;
	const columnSelected = props.selected;
	const columnFocused = props.focus;
	const type = item.isDirectory ? TYPE_DIRECTORY : TYPE_FILE
	const label = item.isDirectory ? item.basename:`${item.basename}.${item.extension}`
	const selected = (key == selectedItem)
	const focused = selected && columnSelected && columnFocused
	const itemProps = Object.assign({},item,{
		key
	,	columnId:id
	,	dispatch
	,	type
	,	label
	,	selected
	,	id:key
	,	focused
	,	ref:selected?'selected':null
	});
	return <ItemController {...itemProps}/>
}