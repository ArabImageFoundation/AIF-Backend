import React,{Component} from 'react';
const cx = require('../../../utils/classes')({
	style:require('./style')
,	className:'Section'
});

export default class Section extends Component{
	render(){
		let {children,className} = this.props;
		if(!children || !children.length){return false;}
		const props = {
			className:cx({additional:className})
		}
		return (<div {...props}>
			{children}
		</div>)
	}
};