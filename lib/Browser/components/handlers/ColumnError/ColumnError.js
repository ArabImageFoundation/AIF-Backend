import React,{Component} from 'react';
import {ErrorMessage} from '../../dumb/Message';

export default class ColumnError extends Component{
	static type = 'error'
	render(){
		const {type} = this.props;
		const message = `there is no handler for type '${type}'`
		return (<ErrorMessage>{message}</ErrorMessage>)
	}
}