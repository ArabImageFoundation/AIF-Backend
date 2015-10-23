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
,	LayoutInfoPaneContainer
,	Overlay
} from './Layout';
import keyHandler from './keyHandler';

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
		const {dispatch,mode} = this.props;
		//keyHandler(dispatch,evt,mode)
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
		const {
			dispatch
		,	info
		,	columns
		,	groups
		,	mode
		} = this.props;
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
				<LayoutInfoPaneContainer {...infoPaneProps}>
					<InfoPane {...info} dispatch={dispatch}/>
				</LayoutInfoPaneContainer>
				<Overlay {...mode} {...info} dispatch={dispatch}/>
			</LayoutContainer>
		)
	}
}

export default connect(mapStateToProps)(Browser);