import React,{Component,PropTypes} from 'react';

export default class Label extends Component{
	static propTypes = {
		path:PropTypes.array.isRequired
	,	changeLabel:PropTypes.func.isRequired
	,	label:PropTypes.oneOfType([PropTypes.string,PropTypes.bool]).isRequired
	}
	constructor(props,context){
		super(props,context);
		this.state = {
			editMode:false
		,	label:props.label
		}
	}
	componentDidUpdate(){
		let node = React.findDOMNode(this.refs.input);
		node && node.focus();
	}
	startEditMode = () =>{
		this.setState({
			editMode:true
		,	label:this.props.label
		});
	}
	stopEditMode(restore){
		this.setState({
			editMode:false
		});
		if(restore){
			const label = this.state.label;
			const {path,changeLabel} = this.props;
			changeLabel(path,label)
		}
	}
	cancelEditMode(){
		this.stopEditMode(true);
	}
	onKeyUp = (evt) => {
		if(evt.keyCode==27){
			this.cancelEditMode();
		}else if(evt.keyCode==13){
			this.stopEditMode();
		}
	}
	onBlur = (evt) => {
		this.stopEditMode();
	}
	editLabel = (evt) =>{
		const value = evt.target.value;
		const {path,changeLabel} = this.props;
		changeLabel(path,value)
	}
	renderInput(label){
		const props = {
			value:label
		,	type:'text'
		,	onChange:this.editLabel
		,	onKeyUp:this.onKeyUp
		,	onBlur:this.onBlur
		,	ref:'input'
		}
		return (<input {...props}/>)
	}
	renderLabel(label){
		const props = {
			onDoubleClick:this.startEditMode
		}
		return (<span {...props}>{label}</span>)
	}
	render(){
		const {label} = this.props;
		const {editMode} = this.state
		if(editMode){
			return this.renderInput(label);
		}
		return this.renderLabel(label);
	}
}