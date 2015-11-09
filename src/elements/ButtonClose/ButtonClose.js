import React,{Component,PropTypes} from 'react';
import styles from './styles';

export default function ButtonClose({onClick,children}){
	const props = {
		className:styles.ButtonClose
	,	href:'#'
	,	onClick
	}
	return (<a {...props}/>)
}
