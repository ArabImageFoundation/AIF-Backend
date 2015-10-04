import React,{Component,Children} from 'react'

const style = {
	clear:'both'
,	float:'left'
,	width:'100%'
,	display:'table-row'
}
const innerStyle = {
	display:'inline-block'
}

export default class LayoutColumnItem extends Component{
	getWidth(){
		return this.refs.root.clientWidth;
	}
	getHeight(){
		return this.refs.root.clientHeight;
	}
	render(){
		const {reverse,children} = this.props
		return (<div style={style} ref="root">
			<div style={innerStyle}>
				{children}
			</div>
		</div>)
	}
}