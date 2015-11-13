import React,{Component,PropTypes} from 'react';
import actions from '../../actions';
const {
	selectColumn
,	removeColumn
,	filterColumn
,	getColumn
} = actions
import MessageError from '../../elements/MessageError';
import MessageLoading from '../../elements/MessageLoading';
import MessageUnknown from '../../elements/MessageUnknown';
import {
	STATUS_ERROR
,	STATUS_LOADING
,	STATUS_LOADED
,	STATUS_UNKNOWN
,	STATUS_NONE
,	STATUS_PROCESSING
} from '../../constants/statuses';
import ColumnItems from '../ColumnItems';
import ColumnContainer from '../ColumnContainer';
import EmptyColumn from './EmptyColumn';
import {
	renderHeader
,	renderItems
,	getHeaderHeight
} from './utils';

const statusMap = {
	[STATUS_ERROR]:MessageError
,	[STATUS_LOADING]:MessageLoading
,	[STATUS_UNKNOWN]:MessageUnknown
,	[STATUS_NONE]:null
,	[STATUS_LOADED]:null
}

const onClick = (dispatch,columnId) => (evt) => {
	evt.preventDefault();
	dispatch(selectColumn({columnId}));
}
const closeColumn = (dispatch,columnId) => (evt) => {
	evt.preventDefault();
	dispatch(removeColumn({columnId}));
}
const onFilter = (dispatch,columnId) => (evt)=>{
	const filter = evt.target.value;
	dispatch(filterColumn({columnId,filter}));
}

module.exports =  class Column extends Component{
	constructor(props,context){
		super(props,context);
		const {columnId,dispatch} = props;
		this.onClick = onClick(dispatch,columnId)
		this.closeColumn = closeColumn(dispatch,columnId)
		this.onFilter = onFilter(dispatch,columnId)
	}
	componentDidMount(){
		const {
			dispatch
		,	status
		,	id
		,	columnId
		} = this.props;
		if(status == STATUS_NONE){
			dispatch(getColumn({id,columnId}));
		}
	}
	renderProcessing(){
		return (<div>loading</div>);
	}
	renderNone(){
		return (<div>none</div>);
	}
	renderEmpty(){
		return (<EmptyColumn {...this.props}/>)
	}
	renderLoaded(headerHeight){
		const {
			item
		,	rows
		,	height
		,	selectedRows
		,	activeRowIndex
		,	items
		} = this.props;
		if(!rows.length){
			return this.renderEmpty()
		}
		return renderItems(rows,selectedRows,activeRowIndex,items,this.props);
	}
	render(){
		const {
			status
		,	height
		,	selected
		} = this.props;

		const headerHeight = getHeaderHeight(height);
		const containerProps = {
			selected
		//,	onClick:this.onClick
		};
		const props = {
			items:(
				(status == STATUS_PROCESSING) ? this.renderProcessing() :
				(status == STATUS_LOADED) ? this.renderLoaded(headerHeight) :
				this.renderNone()
			)
		,	height:height-headerHeight
		,	position:headerHeight
		}
		;
		return (<ColumnContainer {...containerProps}>
			{renderHeader(headerHeight,this.onFilter,this.closeColumn,this.props)}
			<ColumnItems {...props}/>
			<EmptyColumn {...this.props}/>
		</ColumnContainer>)
	}
}
