import React,{Component,PropTypes,Children} from 'react';
import LayoutColumn from '../LayoutColumn';
import styles from './style';

const defProps = {
	className:styles.LayoutColumns
}

const innerProps = {
	className:styles.LayoutColumnsInner
}

export default class LayoutColumns extends Component{
	render(){
		const {width,children} = this.props;
		const props = Object.assign({},defProps,{style:{width}})
		return (<div {...props}>
			<div {...innerProps}>
				{children}
			</div>
		</div>)
	}
}