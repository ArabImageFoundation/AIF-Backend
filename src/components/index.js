import {connect} from 'react-redux';
import mapStateToProps from '../actions/mapStateToProps';
import React,{Component} from 'react';
import Container from './Container'
import Columns from './Columns'
import Column from './Column'
import InfoPaneContainer from './InfoPaneContainer'
import InfoPane from './InfoPane'
import Overlay from './Overlay'
import keyHandler from './keyHandler';
import ActionTesterComponent from '../actions/ActionTesterComponent';

function layoutProps(
	{width,height,infoPaneWidth,infoPanePosition}
,	{dispatch,mode,items}
,	{_setState}
){
	return {
		containerProps:{
			width
		,	height
		,	update:handleUpdateDimensions(_setState)
		,	onKeyDown:handleKeyDown(dispatch,mode)
		}
	,	columnsProps:{
			width:(width - infoPaneWidth - infoPanePosition)
		}
	,	infoPaneProps:{
			width:infoPaneWidth
		,	position:infoPanePosition
		,	toggle:toggleInfoBox(_setState,infoPanePosition,infoPaneWidth)
		}
	,	columnProps:{
			height
		,	dispatch
		,	items
		}
	}
}

const handleKeyDown = (dispatch,mode) => (evt)=>{
	//keyHandler(dispatch,evt,mode)
}
const toggleInfoBox = (setState,infoPanePosition,infoPaneWidth) => (evt) => {
	evt.preventDefault();
	infoPanePosition = (infoPanePosition==0) ? (20 - this.state.infoPaneWidth):0;
	setState({infoPanePosition})
}
const handleUpdateDimensions = (setState) => (width,height) => setState({width,height});

class Browser extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {
			width:0
		,	height:0
		,	infoPaneWidth:200
		,	infoPanePosition:0
		}
		this._setState = this.setState.bind(this);
	}
	_render(){
		return (<ActionTesterComponent dispatch={this.props.dispatch}/>)
	}
	render(){
		const {
			dispatch
		,	selection
		,	items
		,	messages
		,	mode
		,	columns
		} = this.props;
		const {
			containerProps
		,	columnsProps
		,	columnProps
		,	infoPaneProps
		} = layoutProps(this.state,this.props,this);
		return (
			<Container {...containerProps}>
				<Columns {...columnsProps}>
					{columns && columns.map((column,i)=>
						<Column {...column} {...columnProps} key={i}/>
					)}
				</Columns>
				<InfoPaneContainer {...infoPaneProps}>
					<InfoPane {...selection} dispatch={dispatch}/>
				</InfoPaneContainer>
				<Overlay {...mode} {...selection} dispatch={dispatch}/>
			</Container>
		)
	}
}
export default connect(mapStateToProps)(Browser);
