import React,{Component,PropTypes} from 'react';
import ButtonClose from '../../elements/ButtonClose';
import styles from './styles';

module.exports = class ColumnHeader extends Component{
	componentWillReceiveProps(nexProps){
		if(nexProps.showFilter!=this.showFilter){
			this.showFilter = nexProps.showFilter;
			this.changed = true;
		}else{
			this.changed = false;
		}
	}
	inputFocus(){
		if(this.changed){
			this.refs.input && this.refs.input.focus();
		}
	}
	componentDidUpdate(){
		this.inputFocus();
	}
	render(){
		const {
			height
		,	closeColumn
		,	text
		,	children
		,	filter
		,	onChange
		,	showFilter
		} = this.props;
		const props = {
			className:styles.LayoutColumnHeader
		,	style:{height}
		}
		return (<div {...props}>
			{closeColumn ? <ButtonClose onClick={closeColumn}/>:false}
			{showFilter ? <input value={filter} onChange={onChange} type="text" ref="input"/>:false}
			{text}
			{children}
		</div>)
	}
}
