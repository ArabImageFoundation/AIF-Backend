import React,{Component,PropTypes} from 'react'

const style = {
	background:'grey'
,	width:'1em'
,	height:'1em'
,	float:'left'
}

export default class Handle extends Component{
	static propTypes = {
		onMouseDown:PropTypes.func.isRequired
	}
	render(){
		const props = {
			onMouseDown:this.props.onMouseDown
		,	style
		}
		return (<div {...props}></div>)
	}
}