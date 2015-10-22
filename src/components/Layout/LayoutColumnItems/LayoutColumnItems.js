import React,{Component,PropTypes} from 'react';
import styles from './style';

const innerProps = {
	className:styles.LayoutColumnItemsInner	
}

export default class LayoutColumnItems extends Component{
	render(){
		const {height,position,children} = this.props;
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
}