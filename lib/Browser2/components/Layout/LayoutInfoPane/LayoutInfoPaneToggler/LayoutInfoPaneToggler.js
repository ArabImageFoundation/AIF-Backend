import React,{Component,PropTypes} from 'react';
import styles from './style';

const defProps = {
	className:styles.LayoutInfoPaneToggler
}

export default function LayoutInfoPaneToggler({isShowing,toggle}){
	const buttonText = isShowing ? 'hide' : 'show';
	const props = {
		href:'#'
	,	onClick:toggle
	,	className:styles.LayoutInfoPaneToggler+(isShowing?' '+styles.isShowing:'')
	}
	return (<a {...props}/>)
}