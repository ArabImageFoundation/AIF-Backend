import React,{Component,PropTypes} from 'react';
import LayoutButtonClose from '../LayoutButtonClose';
import styles from './style';

export default class LayoutColumnHeader extends Component{
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
			{closeColumn ? <LayoutButtonClose onClick={closeColumn}/>:false}
			{showFilter ? <input value={filter} onChange={onChange} type="text" ref="input"/>:false}
			{children}
		</div>)
	}
}