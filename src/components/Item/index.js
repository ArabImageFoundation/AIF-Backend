import React,{Component,PropTypes} from 'react';
import actions from '../../actions';
const {
	setActiveRow
,	markItem
,	unmarkItem
,	toggleItemMarking
,	addColumn
} = actions
import styles from './styles';
import {classNames} from '../../utils';

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

const onDoubleClick = (dispatch,columnId,id) => (evt) => {
	evt.preventDefault();
	dispatch(addColumn({columnId,id}));
}
const onClick = (dispatch,columnId,id) => (evt) => {
	evt.preventDefault();
	const ctrl = evt.ctrlKey;
	if(ctrl){
		dispatch(toggleItemMarking({id}))
	}else{
		dispatch(setActiveRow({columnId,activeRowIndex:id}))
	}
}


module.exports = class Item extends Component{
	render(){
		console.log(this.props);
		const {marked,dispatch,columnId,selected} = this.props;
		const {type,_id:id,name} = this.props.doc;
		const props = {
			className:classNames(styles,'Item',{selected,type,marked})
		,	onClick:onClick(dispatch,columnId,id)
		,	onDoubleClick:onDoubleClick(dispatch,columnId,id)
		};
		return (<div {...props}>{name}</div>)
	}
}
