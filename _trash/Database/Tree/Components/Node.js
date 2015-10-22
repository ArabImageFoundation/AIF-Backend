import React,{Component,PropTypes} from 'react';
import Label from './Label';
import Entry from './Entry';
import OrderingButtons from './OrderingButtons';
import Handle from './Handle';
import DragTarget from './DragTarget';

function renderChildren(children,{
		add
	,	path
	,	changeLabel
	,	up
	,	down
	,	isItemInAddMode
	,	addMode
	,	beginDrag
	,	endDrag
	,	isDragging
	}){
	if(!children || !children.size){return false;}
	const props = {
		add
	,	changeLabel
	,	up
	,	down
	,	isItemInAddMode
	,	addMode
	,	beginDrag
	,	endDrag
	,	isDragging
	}
	return children.map((node,index)=>{
		let _path = path.slice();
		_path.push('children',index);
		const childProps = Object.assign({},props,{
			node
		,	path:_path
		})
		return (<li key={index}>
			<Node {...childProps}/>
		</li>)
	})
}

export default class Node extends Component{
	static propTypes = {
		add:PropTypes.func.isRequired
	,	changeLabel:PropTypes.func.isRequired
	,	up:PropTypes.func.isRequired
	,	down:PropTypes.func.isRequired
	,	node:PropTypes.any.isRequired
	,	path:PropTypes.array.isRequired
	,	addMode:PropTypes.func.isRequired
	,	isItemInAddMode:PropTypes.func.isRequired
	,	beginDrag:PropTypes.func.isRequired
	,	endDrag:PropTypes.func.isRequired
	,	isDragging:PropTypes.func.isRequired
	}
	add = (value) => {
		if(!value){return;}
		const {path} = this.props;
		this.props.add(path,value);
	}
	startAddInput = () =>{
		this.props.addMode(this.props.path);
	}
	stopAddInput = () =>{
		this.props.addMode(false);
	}
	onStartDrag = (evt)=>{
		evt.stopPropagation();
		evt.preventDefault();
		this.props.beginDrag(this.props.path);
	}
	isFirstNode(){
		return (this.props.node.get('label')===false)
	}
	children(){
		return renderChildren(this.props.node.get('children'),this.props)
	}
	button(){
		const {showAddInput} = this.props.isItemInAddMode(this.props.path)
		const props = {
			onClick: showAddInput ? this.stopAddInput : this.startAddInput
		}
		const text = showAddInput?'-':'+';
		return (<button {...props}>{text}</button>)
	}
	handle(){
		if(this.isFirstNode()){return false;}
		const props = {
			onMouseDown:this.onStartDrag
		}
		return <Handle {...props}/>
	}
	orderingButtons(){
		if(this.isFirstNode()){return false;}
		const props = {
			path:this.props.path			
		,	up:this.props.up
		,	down:this.props.down
		}
		return <OrderingButtons {...props}/>
	}
	label(){
		if(this.isFirstNode()){return false;}
		const props = {
			path:this.props.path
		,	changeLabel:this.props.changeLabel
		,	label:this.props.node.get('label')
		}
		return <Label {...props}/>
	}
	entry(){
		const props = {
			hide:this.stopAddInput
		,	add:this.add
		,	show:this.props.isItemInAddMode(this.props.path)
		}
		return <Entry {...props}/>
	}
	dragTarget(position){
		const props = {
			position
		,	path:this.props.path
		,	isDragging:this.props.isDragging
		,	onDragEnd:this.props.endDrag
		}
		return <DragTarget {...props}/>
	}
	render(){
		const props = {
			onMouseOver: this.onMouseOver
		,	onMouseOut: this.onMouseOut
		}
		return (<div {...props}>
			{this.dragTarget('before')}
			<div>
				{this.handle()}
				{this.orderingButtons()}
				{this.label()}
			</div>
			{this.button()}
			<ul>
				{this.children()}
				{this.entry()}
			</ul>
			{this.dragTarget('after')}
		</div>)
	}
}