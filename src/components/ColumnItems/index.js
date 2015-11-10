import React,{Component,PropTypes} from 'react';
import styles from './styles';

const innerProps = {
	className:styles.ColumnItemsInner
}

module.exports = class ColumnItems extends Component{
	render(){
		const {
			height
		,	position
		,	children
		,	items
		} = this.props;
		const props = {
			className:styles.ColumnItems
		,	style:{
				height
			,	top:position
			}
		}
		return (<div {...props}>
			<div {...innerProps}>
				{items}
				{children}
			</div>
		</div>)
	}
}
