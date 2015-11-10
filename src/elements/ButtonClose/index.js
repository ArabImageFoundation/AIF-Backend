import React,{Component,PropTypes} from 'react';
import styles from './styles';

module.exports = function ButtonClose({onClick,children}){
	const props = {
		className:styles.ButtonClose
	,	href:'#'
	,	onClick
	}
	return (<a {...props}/>)
}
