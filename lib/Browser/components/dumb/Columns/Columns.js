import React,{Component} from 'react';
import mixProps from '../../../utils/mixProps';
const cx = require('../../../utils/classes')({
	style:require('./style')
});

const ColumnsWrapperProps = {
	className:cx('ColumnsWrapper')
}

export default class Columns extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {
			width:0
		}
	}
	getChildrenWidth(state){
		const {wrapper,columns} = this.refs;
		const children = wrapper.children;
		let length = children.length;
		let width = 0;
		while(length-- > 0){
			let child = children[length];
			width+=child.clientWidth;
		}
		if(state.width!=width){
			this.setState({width});
			columns.scrollLeft = width;
		}
	}
	componentDidMount(){
		const {wrapper} = this.refs;
		const scrollLeft = wrapper && wrapper.scrollLeft;
		this.getChildrenWidth(this.state)
	}
	componentDidUpdate(){
		const {wrapper} = this.refs;
		const scrollLeft = wrapper && wrapper.scrollLeft;
		this.getChildrenWidth(this.state)
	}
	render(){
		const {focused} = this.props;
		const {width} = this.state;
		const defProps = {
			className:cx({className:'Columns',props:{focused}})
		,	tabIndex:0
		,	ref:'columns'
		}
		const props = mixProps(defProps,this.props);
		const innerProps = Object.assign({},ColumnsWrapperProps,{style:{width}})
		return (<div {...props}>
			<div {...innerProps} ref="wrapper">
				{this.props.children}
			</div>
		</div>);
	}
}