import React,{Component} from 'react';
import ColumnHeader from '../ColumnHeader';
const cx = require('../../../utils/classes')({
	style:require('./style')
});

const innerProps ={
	className:cx('ColumnInner')
}

const rowProps = {
	className:cx('RowsContainer')
}

const rowInnerProps = {
	className:cx('RowsContainerInner')
}

const rowWrapperProps = {
	className:cx('RowsContainerWrapper')
}

export default class Column extends Component {
	focus(){
		let {column} = this.refs;
		column && column.focus();
	}
	renderHeader(){
		const {id,selected,header,onClose} = this.props;
		if(!header){return false};
		const props = {
			filename:header
		,	id
		,	onClose
		,	selected
		}
		return <ColumnHeader {...props}/>
	}
	render(){
		const {id,selected} = this.props;
		const props = {
			id:`column_${id}`
		,	tabIndex:id
		,	className:cx('Column',{props:{selected}})
		}
		return (<div {...props}>
			<div {...innerProps}>
				{this.renderHeader()}
				<div {...rowProps}>
					<div {...rowInnerProps}>
						<div {...rowWrapperProps}>
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		</div>)
	}
};