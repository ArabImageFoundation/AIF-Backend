import React,{Component,PropTypes} from 'react';
import {
	selectColumn
,	removeColumn
,	filterColumn
} from '../../actions';
import MessageError from '../../elements/MessageError';
import MessageLoading from '../../elements/MessageLoading';
import MessageUnknown from '../../elements/MessageUnknown';
import{
	TYPE_DIRECTORY
,	TYPE_FILE
,	TYPE_UNKNOWN
,	TYPE_FIRST
,	TYPE_GROUP
} from '../../constants/types';
import {
	STATUS_ERROR
,	STATUS_LOADING
,	STATUS_LOADED
,	STATUS_UNKNOWN
,	STATUS_NONE
} from '../../constants/statuses';
import DirectoryColumnItems from './DirectoryColumnItems';
import FirstColumnItems from './FirstColumnItems';
import FileColumnItems from './FileColumnItems';
import GroupColumnItems from './GroupColumnItems';
import ColumnContainer from '../ColumnContainer'
import {
	renderHeader
,	renderItems
,	getHeaderHeight
} from './utils';

const map = {
	[TYPE_DIRECTORY]:DirectoryColumnItems
,	[TYPE_FIRST]:FirstColumnItems
,	[TYPE_FILE]:FileColumnItems
,	[TYPE_GROUP]:GroupColumnItems
}

const statusMap = {
	[STATUS_ERROR]:MessageError
,	[STATUS_LOADING]:MessageLoading
,	[STATUS_UNKNOWN]:MessageUnknown
,	[STATUS_NONE]:null
,	[STATUS_LOADED]:null
}

module.exports =  class Column extends Component{
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
	onFilter = (evt)=>{
		const {
			dispatch
		,	id
		} = this.props;
		dispatch(filterColumn(id,evt.target.value));
	}
	render(){
		const {
			type
		,	status
		,	height
		,	selected
		} = this.props;
		console.log(this.props)
		const headerHeight = getHeaderHeight(height);
		const Component = statusMap[status] || map[type] || ErrorColumn;

		const containerProps = {
			selected
		,	onClick:this.onClick
		};
		return (<ColumnContainer {...containerProps}>
			{renderHeader(headerHeight,this.onFilter,this.closeColumn,this.props)}
			<Component {...{...this.props,headerHeight,renderItems}}/>
		</ColumnContainer>)
	}
}
