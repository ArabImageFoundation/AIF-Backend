import React,{Component,PropTypes} from 'react';
import styles from './style';
import {classNames} from '../../../utils';


export default class LayoutColumnItem extends Component{
	render(){
		const {
			selected
		,	type
		,	marked
		,	onClick
		,	onDoubleClick
		,	children
		} = this.props;
		const props = {
			className:classNames(styles,'LayoutColumnItem',{selected,type,marked})
		,	onClick
		,	onDoubleClick
		};
		return (<div {...props}>
			{children}
		</div>)
	}
}