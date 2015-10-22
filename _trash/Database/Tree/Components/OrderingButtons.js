import React,{Component,PropTypes} from 'react';

class OrderButton extends Component{
	static PropTypes = {
		onClick:PropTypes.func.isRequired
	}
	handleClick = (evt) => {
		evt.preventDefault();
		this.props.onClick(evt);
	}
	render(){
		const {children} = this.props
		return (<a href='#' onClick={this.handleClick}>{children}</a>)
	}
}

export default class OrderingButtons extends Component{
	static propTypes = {
		path:PropTypes.array.isRequired
	,	up:PropTypes.func.isRequired
	,	down:PropTypes.func.isRequired
	}
	increaseOrder = (evt) => {
		const {path,up} = this.props;
		up(path)
	}
	decreaseOrder = (evt) => {
		const {path,down} = this.props;
		down(path)
	}
	render(){
		return (<span>
			<OrderButton onClick={this.increaseOrder}>&#9206;</OrderButton>
			<OrderButton onClick={this.decreaseOrder}>&#9207;</OrderButton>
		</span>)
	}
}