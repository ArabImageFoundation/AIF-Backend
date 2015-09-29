import React,{Component} from 'react';
import mixProps from '../../../utils/mixProps';
const cx = require('../../../utils/classes')({
	style:require('./style')
});

const ColumnsWrapperProps = {
	className:cx('ColumnsWrapper')
}

export default class Columns extends Component{
	componentDidMount(){
		const {columns} = this.refs;
		columns && columns.focus();
	}
	render(){
		const {focused} = this.props;
		const defProps = {
			className:cx({className:'Columns',props:{focused}})
		,	tabIndex:0
		,	ref:'columns'
		}
		const props = mixProps(defProps,this.props);
		return (<div {...props}>
			<div {...ColumnsWrapperProps}>
				{this.props.children}
			</div>
		</div>);
	}
}