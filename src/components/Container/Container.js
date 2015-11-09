import React,{Component,PropTypes} from 'react';
import styles from './styles';

const props = {
	className:styles.Container
,	tabIndex:0
}

function updateDimensions(node,props,update){
	let {clientWidth,clientHeight} = node;
	if(clientWidth!=props.width || clientHeight!=props.height){
		update(clientWidth,clientHeight);
	}
}

export default class Container extends Component{
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
