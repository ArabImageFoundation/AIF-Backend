import React,{Component} from 'react';
import styles from './styles';

function handleInputEnter(evt){
	if(evt.keyCode!=13){return;}
	evt.preventDefault();
	const node = evt.target;
	const value = node.value;
	const {onSubmit} = this.props;
	node.select();
	onSubmit(value);
}
function handleInputChange(evt){
	this.setState({input:evt.target.value});
}

export default class FieldSubmit extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {input:''}
		this.handleInputEnter = handleInputEnter.bind(this);
		this.handleInputChange = handleInputChange.bind(this);
	}
	render(){
		const {input} = this.state;
		const props = {
			value:input
		,	type:'text'
		,	onChange:this.handleInputChange
		,	onKeyUp:this.handleInputEnter
		,	className:styles.input
		}
		return (<input {...props}/>);
	}
}
