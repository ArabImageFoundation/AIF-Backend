import React,{Component,PropTypes} from 'react';
import styles from './styles';
import {classNames} from '../../utils';

const innerProps = {
	className:styles
}

export default class ColumnContainer extends Component{
	render(){
		const {
			onClick
		,	selected
		,	children
		} = this.props;
		const props = {
			className:classNames(styles,'ColumnContainer',{selected})
		,	onClick
		}
		return (<div {...props}>
			<div className={classNames(styles,'ColumnContainerInner')}>
				{children}
			</div>
		</div>)
	}
}
