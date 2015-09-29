import React,{Component} from 'react';
const cx = require('../../../utils/classes')({
	style:require('./style')
});

export default class Message extends Component{
	renderTitle(title){
		return (title && (<h2>{title}</h2>) || false);
	}
	render(){
		const {children,title} = this.props;
		if(!title || (!children || !children.length)){return false;}
		return (<div {...props}>
			{this.title(title)}
			{children}
		</div>)
	}
}