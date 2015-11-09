import React,{Component,PropTypes} from 'react';
import styles from './styles';
import {classNames} from '../../../utils';


export default class ColumnItem extends Component{
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
			className:classNames(styles,'ColumnItem',{selected,type,marked})
		,	onClick
		,	onDoubleClick
		};
		return (<div {...props}>
			{children}
		</div>)
	}
}
