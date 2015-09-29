import ColumnController from './ColumnController';
import React,{Component} from 'react';
import Columns from './dumb/Columns'
import {KEY_UP,KEY_DOWN,KEY_LEFT,KEY_RIGHT,KEY_ENTER} from '../constants';
import {selectNextColumn,selectPreviousColumn,selectNextItem,selectPreviousItem} from '../actions/columns'
import {focusIn,focusOut} from '../actions/ui';

export default class ColumnsController extends Component{
	onKeyUp = (evt) => {
		const {dispatch,selectedColumn} = this.props;
		switch(evt.keyCode){
			case KEY_RIGHT:return dispatch(selectNextColumn());
			case KEY_LEFT: return dispatch(selectPreviousColumn());
			case KEY_UP: return dispatch(selectPreviousItem());
			case KEY_DOWN: return dispatch(selectNextItem());
		}
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
		const {columns,dispatch,selectedColumn} = this.props;
		if (!columns || !columns.length){return false;}
		return columns.map((column,i)=>{
			return <ColumnController {...column} dispatch={dispatch} key={i}/>
		}) 
	}
	render(){
		const props = {
			onKeyUp:this.onKeyUp
		,	onFocus:this.onFocusIn
		,	onBlur:this.onFocusOut
		,	focused:this.props.ui.focused
		}
		return (<Columns {...props}>
			{this.columns()}
		</Columns>);
	}
}

