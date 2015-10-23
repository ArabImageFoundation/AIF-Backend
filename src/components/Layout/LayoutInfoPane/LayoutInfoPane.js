import React,{Component,PropTypes} from 'react';
import styles from './style';

const props = {
	className:styles.LayoutInfoPane
}

export default class LayoutInfoPane extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {input:''}
	}
	handleInputEnter = (evt) =>{
		if(evt.keyCode!=13){return;}
		evt.preventDefault();
		const {onAddGroup} = this.props;
		const node = evt.target;
		const value = node.value;
		node.select();
		onAddGroup(value);
	}
	handleInputChange = (evt) =>{
		this.setState({input:evt.target.value});
	}
	handleAddGroupToRoot(group){
		const {onAddGroupToRoot} = this.props;
		return (evt)=>{
			evt.preventDefault();
			onAddGroupToRoot(group);
		}
	}
	handleRemoveGroup(group){
		const {onRemoveGroup} = this.props;
		return (evt)=>{
			evt.preventDefault();
			onRemoveGroup(group)
		}
	}
	handleShowImage(path){
		const {onShowImage} = this.props;
		return (evt)=>{
			evt.preventDefault();
			onShowImage(path);
		}
	}
	renderImages(images){
		return (images && images.length ? (<div className={styles.LayoutInfoPaneImagesContainer}>
			{images.map((image,index)=><a
				href="#" 
				key={image.path} 
				style={{backgroundImage:`url('${image.path}')`}} 
				className={styles.LayoutInfoPaneImage}
				onClick={this.handleShowImage(index)}
				/>)}
		</div>):false)
	}
	renderProp(name,prop){
		return (prop ? (<div>{name}:{prop}</div>) : false);
	}
	renderGroups(groups){
		return (groups ? groups.map((group,key)=>
			<div key={key} className={styles.group}>
				{group}
				<a href="#" onClick={this.handleRemoveGroup(group)}>-</a>
				<a href="#" onClick={this.handleAddGroupToRoot(group)}>+</a>
			</div>
		) : false);
	}
	renderInputForm(){
		const onSubmit = this.onSubmit
		const {input} = this.state;
		const props = {
			value:input
		,	type:'text'
		,	onChange:this.handleInputChange
		,	onKeyUp:this.handleInputEnter
		,	className:styles.input
		}
		return (<div>Add:
			<input {...props}/>
		</div>);
	}
	render(){
		const {
			size
		,	groups
		,	selected
		,	images
		} = this.props;
		return (<div>
			{this.renderImages(images)}
			<hr/>
			{this.renderProp('selected',selected)}
			{this.renderProp('size',size)}
			<div>
				{selected?<div><hr/>Groups</div>:false}
				<div style={{float:'left',clear:'both',width:'100%'}}>{this.renderGroups(groups)}</div>
				{selected? this.renderInputForm():false}
			</div>
		</div>)
	}
}