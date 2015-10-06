import React,{Component,PropTypes} from 'react';
import {fetchDirectoryIfNeeded} from '../../actions/api/directories';
import {selectColumn,removeColumn} from '../../actions/ui/columns';
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

const map = {
	[TYPE_DIRECTORY]:DirectoryColumn
,	[TYPE_FIRST]:FirstColumn
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
		const props = Object.assign({},this.props,{onClick})
		return <Component {...this.props}/>
	}
}