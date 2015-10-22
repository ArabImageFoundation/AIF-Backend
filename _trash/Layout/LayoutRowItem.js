import React,{Component,Children} from 'react'

export default class LayoutRowItem extends Component{
	getWidth(){
		return this.refs.root.clientWidth;
	}
	getHeight(){
		return this.refs.root.clientHeight;
	}
	render(){
		const {reverse,children} = this.props
		const style = {
			float:reverse?'right':'left'
		,	display:'inline'
		}
		return (<div style={style} ref="root">
				{children}
		</div>)
	}
}