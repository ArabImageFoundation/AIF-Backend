import React,{Component} from 'react';
import Message from '../Message';

/**
export default class LoadingMessage extends Component{
	render(){
		const {title,children} = this.props;
		
	}
}
**/

const LoadingMessage = ({title,children}) =>(
	(<Message title={title || 'Loading'}>{children}</Message>)
)

export default LoadingMessage;