import React,{Component,PropTypes} from 'react';

module.exports = class ItemUnknown extends Component{
	render(){
		const {name} = this.props;
		return (<span>{name||'UNKNOWN'}</span>)
	}
}
