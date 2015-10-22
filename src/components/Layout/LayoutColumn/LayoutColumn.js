import React,{Component,PropTypes} from 'react';
import styles from './style';
import {classNames} from '../../../utils';
import LayoutColumnItem from '../LayoutColumnItem';
import LayoutColumnHeader from '../LayoutColumnHeader';

const innerProps = {
	className:styles
}

export default class LayoutColumn extends Component{
	render(){
		const {
			onClick
		,	selected
		,	children
		} = this.props;
		const props = {
			className:classNames(styles,'LayoutColumn',{selected})
		,	onClick
		}
		return (<div {...props}>
			{children}
		</div>)
	}
}