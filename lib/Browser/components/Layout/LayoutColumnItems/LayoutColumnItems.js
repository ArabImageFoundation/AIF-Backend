import React,{Component,PropTypes} from 'react';
import styles from './style';

const innerProps = {
	className:styles.LayoutColumnItemsInner	
}

export default function LayoutColumnItems({height,position,children}){
	const props = {
		className:styles.LayoutColumnItems
	,	style:{
			height
		,	top:position
		}	
	}
	return (<div {...props}>
		<div {...innerProps}>
			{children}
		</div>
	</div>)
}