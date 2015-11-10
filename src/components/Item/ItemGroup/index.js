import React,{Component,PropTypes} from 'react';

module.exports = class ItemGroup extends Component{
	render(){
		const {
			path
		,	type
		,	selected
		,	marked
		,	file
		,	onClick
		,	onDoubleClick
		} = this.props;
		return (<span>{path}</span>)
	}
}
