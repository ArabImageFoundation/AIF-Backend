import React,{Component,PropTypes} from 'react';
import styles from './style';
import LayoutColumns from '../LayoutColumns';
import LayoutInfoPane from '../LayoutInfoPane';

const props = {
	className:styles.LayoutContainer
,	tabIndex:0
}

function updateDimensions(node,props,update){
	let {clientWidth,clientHeight} = node;
	if(clientWidth!=props.width || clientHeight!=props.height){
		update(clientWidth,clientHeight);
	}
}

export default class LayoutContainer extends Component{
	componentDidMount(){
		if(this.props.fixed){return;}
		
		const node = this.refs.root;
		
		const props = this.props;
		const {update} = props;

		window.addEventListener('resize',()=>{
			updateDimensions(this.refs.root,props,update);
		}, true);
		updateDimensions(node,props,update);
	}
	render(){
		const {children,onKeyDown} = this.props;
		return (<div {...props} ref="root" onKeyDown={onKeyDown}>
			{children}
		</div>)
	}
}