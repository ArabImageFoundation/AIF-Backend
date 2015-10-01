import React,{Component} from 'react';
const cx = require('../../../utils/classes')({
	style:require('./style')
});
const props = {
	className:cx('ColumnHeader')
}

export default class ColumnHeader extends Component{
	handleClick = (evt) =>{
		evt.preventDefault();
		this.props.onClose(evt);
	}
	renderCloseButton(){
		const props = {
			className:cx('closeButton')
		}
		return (<a {...props} onClick={this.handleClick}>x</a>)
	}
	renderCloseButtonIfNecessary(){
		const {id} = this.props;
		return (id!==0) ? this.renderCloseButton() : false
	}
	render(){
		const {filename} = this.props
		return (<div {...props}>
			<h1>
			{filename || '\u00A0'}
			{this.renderCloseButtonIfNecessary()}
			</h1>
		</div>)
	}
};