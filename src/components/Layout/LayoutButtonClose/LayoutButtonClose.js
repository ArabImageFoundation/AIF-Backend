import React,{Component,PropTypes} from 'react';
import styles from './style';

export default class LayoutButtonClose extends Component{
	render(){
		const {onClick,children} = this.props;
		const props = {
			className:styles.LayoutButtonClose
		,	href:'#'
		,	onClick
		}
		return (<a {...props}/>)
	}
}