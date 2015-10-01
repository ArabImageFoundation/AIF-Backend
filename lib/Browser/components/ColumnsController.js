import ColumnController from './ColumnController';
import React,{Component} from 'react';
import Columns from './dumb/Columns'
import {KEY_UP,KEY_DOWN,KEY_LEFT,KEY_RIGHT,KEY_ENTER} from '../constants';
import {selectNextColumn,selectPreviousColumn,selectNextItem,selectPreviousItem} from '../actions/columns'
import {focusIn,focusOut} from '../actions/ui';

export default class ColumnsController extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {
			lastColumn:''
		,	shouldScroll:false
		,	columnsNumber:0
		,	columnsChanged:false
		}
	}
	onKeyUp = (evt) => {
		const {dispatch,selectedColumn} = this.props;
		switch(evt.keyCode){
			case KEY_RIGHT:return dispatch(selectNextColumn());
			case KEY_LEFT: return dispatch(selectPreviousColumn());
			case KEY_UP: return dispatch(selectPreviousItem());
			case KEY_DOWN: return dispatch(selectNextItem());
		}
	}
	checkIfLastColumnChanged(props,state){
		const {columns} = props;
		const length = columns && columns.length
		if (!length){return false;}
		const lastLength = state.columnsNumber;
		const lastColumn = columns[length-1].path;
		const previousLastColumn = state.lastColumn;
		if(length !== lastLength || lastColumn!=previousLastColumn){
			return {
				lastColumn
			,	columnsChanged:true
			,	shouldScroll:true
			,	columnsNumber:length
			}
		}else if(state.shouldScroll || state.columnsChanged){
			return {
				columnsChanged:false
			,	shouldScroll:false
			}
		}
	}
	updateStateIfLastColumnChanged(props,state){
		const lastColumnState = this.checkIfLastColumnChanged(props,state);
		if(lastColumnState){
			this.setState(lastColumnState);
		}
	}
	componentDidMount(){
		this.updateStateIfLastColumnChanged(this.props,this.state);
	}
	componentWillReceiveProps(nextProps){
		this.updateStateIfLastColumnChanged(nextProps,this.state);
	}
	onFocusIn = (evt) =>{
		const {dispatch} = this.props;
		dispatch(focusIn());
	}
	onFocusOut = (evt) =>{
		const {dispatch} = this.props;
		dispatch(focusOut());
	}
	columns(){
		const {columns,dispatch} = this.props;
		const length = columns && columns.length
		if (!length){return false;}
		return columns.map((column,i)=>{
			return <ColumnController {...column} dispatch={dispatch} key={i}/>
		}) 
	}
	render(){
		const props = {
			onKeyUp:this.onKeyUp
		,	focused:true
		,	shouldScroll:this.state.shouldScroll
		}
		return (<Columns {...props}>
			{this.columns()}
		</Columns>);
	}
}

