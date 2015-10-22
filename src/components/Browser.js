import {connect} from 'react-redux';
import {mapStateToProps} from '../reducers';
import React,{Component} from 'react';
import InfoPane from './InfoPane';
import Column from './Column';
import {
	LayoutColumn
,	LayoutColumnHeader
,	LayoutColumnItems
,	LayoutColumnItem
,	LayoutColumns
,	LayoutContainer
,	LayoutInfoPane
} from './Layout';
import {
	KEY_LEFT
,	KEY_RIGHT
,	KEY_UP
,	KEY_DOWN
,	KEY_CONFIRM
,	KEY_CANCEL
,	KEY_FORWARD
,	KEY_BACK
,	KEY_TOP
,	KEY_BOTTOM
} from '../constants'
import {
	selectNextColumn
,	selectPreviousColumn
,	markItem
,	markNextItem
,	markPreviousItem
,	selectItem
,	selectNextItem
,	selectPreviousItem
} from '../actions'


function layoutProps(
	{width,height,infoPaneWidth,infoPanePosition}
,	{dispatch}
,	{updateDimensions,toggleInfoBox,handleKeyDown}
){
	return {
		containerProps:{width,height,update:updateDimensions,onKeyDown:handleKeyDown}
	,	columnsProps:{width:width - infoPaneWidth - infoPanePosition}
	,	infoPaneProps:{width:infoPaneWidth,position:infoPanePosition,toggle:toggleInfoBox}
	,	columnProps:{height,dispatch}
	}
}

class Browser extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {
			width:0
		,	height:0
		,	infoPaneWidth:200
		,	infoPanePosition:0
		}
	}
	handleKeyDown = (evt) =>{
		const {dispatch} = this.props;
		switch(evt.keyCode){
			case KEY_LEFT:
				return dispatch(selectPreviousColumn())
			case KEY_RIGHT:
				return dispatch(selectNextColumn())
			case KEY_UP:
				return dispatch(selectPreviousItem())
			case KEY_DOWN:
				return dispatch(selectNextItem())
			case KEY_CONFIRM:
			case KEY_CANCEL:
			case KEY_FORWARD:
			case KEY_BACK:
			case KEY_TOP:
			case KEY_BOTTOM:
				return true
			default:
				break;
		}
		console.log(evt.keyCode)
	}
	toggleInfoBox = (evt) =>{
		evt.preventDefault();
		if(this.state.infoPanePosition==0){
			return this.hideInfoBox();
		}
		return this.showInfoBox();
	}
	hideInfoBox(){
		const infoPanePosition = 20 - this.state.infoPaneWidth;
		this.setState({infoPanePosition});
	}
	showInfoBox(){
		const infoPanePosition = 0;
		this.setState({infoPanePosition});	
	}
	updateDimensions = (width,height) => {
		this.setState({width,height});
	}
	render(){
		const {dispatch,info,columns,groups} = this.props;
		const {
			containerProps
		,	columnsProps
		,	columnProps
		,	infoPaneProps
		} = layoutProps(this.state,this.props,this);
		return (
			<LayoutContainer {...containerProps}>
				<LayoutColumns {...columnsProps}>
					{columns && columns.map((column,i)=>
						<Column {...column} {...columnProps} key={i}/>
					)}
				</LayoutColumns>
				<LayoutInfoPane {...infoPaneProps}>
					<InfoPane {...info}/>
				</LayoutInfoPane>
			</LayoutContainer>
		)
	}
}

export default connect(mapStateToProps)(Browser);