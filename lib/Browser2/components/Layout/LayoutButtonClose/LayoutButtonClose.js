import React,{Component,PropTypes} from 'react';
import styles from './style';

export default function LayoutButtonClose({onClick,children}){
	const props = {
		className:styles.LayoutButtonClose
	,	href:'#'
	,	onClick
	}
	return (<a {...props}/>)
}