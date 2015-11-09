import React,{Component,PropTypes} from 'react';

export default class ItemUnknown extends Component{
	render(){
		const {name} = this.props;
		return (<span>{name||'UNKNOWN'}</span>)
	}
}
