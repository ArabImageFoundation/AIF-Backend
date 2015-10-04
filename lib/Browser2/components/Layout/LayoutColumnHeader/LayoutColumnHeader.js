import React,{Component,PropTypes} from 'react';
import LayoutButtonClose from '../LayoutButtonClose';
import styles from './style';

export default function LayoutColumnHeader({height,closeColumn,children}){
	const props = {
		className:styles.LayoutColumnHeader
	,	style:{height}
	}
	return (<div {...props}>
		{closeColumn ? <LayoutButtonClose onClick={closeColumn}/>:false}
		{children}
	</div>)
}