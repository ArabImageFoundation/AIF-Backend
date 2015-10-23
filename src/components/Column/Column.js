import React,{Component,PropTypes} from 'react';
import {selectColumn,removeColumn,fetchDirectoryIfNeeded} from '../../actions';

import{
	TYPE_DIRECTORY
,	TYPE_FILE
,	TYPE_UNKNOWN
,	TYPE_FIRST
,	TYPE_GROUP
} from '../../constants/types';
import DirectoryColumn from './DirectoryColumn';
import FirstColumn from './FirstColumn';
import ErrorColumn from './ErrorColumn';
import FileColumn from './FileColumn';
import GroupColumn from './GroupColumn';

const map = {
	[TYPE_DIRECTORY]:DirectoryColumn
,	[TYPE_FIRST]:FirstColumn
,	[TYPE_FILE]:FileColumn
,	[TYPE_GROUP]:GroupColumn
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
	render(){
		const {type} = this.props;
		const Component = map[type] || ErrorColumn;
		const onClick = this.onClick;
		const name = (this.props.name || this.props.path || '').replace(/^\/|\/$/g,'').split('/').pop();
		const props = Object.assign({},this.props,{name})
		return <Component {...props}/>
	}
}