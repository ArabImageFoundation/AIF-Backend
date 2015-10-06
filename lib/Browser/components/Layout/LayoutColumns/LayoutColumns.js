import React,{Component,PropTypes,Children} from 'react';
import LayoutColumn from '../LayoutColumn';
import styles from './style';

const defProps = {
	className:styles.LayoutColumns
}

const innerProps = {
	className:styles.LayoutColumnsInner
}

export default function LayoutColumns({width,children}){
	const props = Object.assign({},defProps,{style:{width}})
	return (<div {...props}>
		<div {...innerProps}>
			{children}
		</div>
	</div>)
}