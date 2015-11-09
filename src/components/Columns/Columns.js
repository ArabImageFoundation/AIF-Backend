import React,{Component,PropTypes,Children} from 'react';
import Column from '../Column';
import styles from './styles';

const innerProps = {
	className:styles.ColumnsInner
}

export default function Columns({width,children}){
	const props = {
		className:styles.Columns
	,	style:{width}
	}
	return (<div {...props}>
		<div {...innerProps}>
			{children}
		</div>
	</div>)
}
