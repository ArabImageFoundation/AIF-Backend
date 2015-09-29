import React,{Component} from 'react';


export default class ErrorMessage extends Component{
	render(){
		const {title,children} = this.props;
		return (<Message title={title || 'Error'}>{children}</Message>)
	}
};