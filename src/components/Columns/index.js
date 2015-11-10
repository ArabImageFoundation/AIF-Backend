import React,{Component,PropTypes,Children} from 'react';
import Column from '../Column';
import styles from './styles';

const innerProps = {
	className:styles.ColumnsInner
}

module.exports = function Columns({width,children}){
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
