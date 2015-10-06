import React,{Component,PropTypes} from 'react';
import styles from './style';
import {classNames} from '../../../utils';
import LayoutColumnItem from '../LayoutColumnItem';
import LayoutColumnHeader from '../LayoutColumnHeader';

const innerProps = {
	className:styles
}

export default function LayoutColumn({
	onClick
,	selected
,	children
}){
	const props = {
		className:classNames(styles,'LayoutColumn',{selected})
	,	onClick
	}
	return (<div {...props}>
		{children}
	</div>)
}