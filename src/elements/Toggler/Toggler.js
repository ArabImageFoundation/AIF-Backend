import React,{Component,PropTypes} from 'react';
import styles from './styles';

export default function Toggler({isShowing,toggle,vertical}){
	const buttonText = isShowing ? 'hide' : 'show';
	const props = {
		href:'#'
	,	onClick:toggle
	,	className:styles.InfoPaneToggler+(isShowing?' '+styles.isShowing:'')+' '+(vertical?styles.vertical:styles.horizontal)
	}
	return (<span {...props}/>)
}
