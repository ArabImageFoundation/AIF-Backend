import React,{Component,PropTypes} from 'react';
import Immutable from 'immutable';
import Node from './Node';

function node(label,...children){
	children = Immutable.fromJS(children || []);
	return Immutable.Map({
		label
	,	children
	});
}

function changeTreeOrder(tree,path,add){
	const listPath = path.slice(0,-1);
	const list = tree.getIn(listPath)
	const size = list.size;
	const index = path[path.length-1];
	const item = list.get(index);
	const otherIndex = index+add;
	const otherItem = list.get(otherIndex)
	if(
		(index<=0 && otherIndex<=0) ||
		(index>=size-1 && otherIndex>=size)
	){
		return;
	}
	return tree.setIn(
		listPath
	,	(
			(otherIndex >= size) ? list.splice(index,1).push(item) :
			(otherIndex <= 0) ? list.splice(index,1).unshift(item) :
			list.set(otherIndex,item).set(index,otherItem)
		)
	);
}

function move(tree,oldPath,newPath,add){
	console.log(oldPath,newPath);
	const oldListPath = oldPath.slice(0,-1);
	const oldIndex = oldPath[oldPath.length-1];
	const oldList = tree.getIn(oldListPath);
	const item = oldList.get(oldIndex);
	const newListPath = newPath.slice(0,-1);
	const newIndex = newPath[newPath.length-1]+add;
	const newList = tree.getIn(newListPath);
	const _tree = tree.updateIn(oldListPath,list=>list.splice(oldIndex,1))
	if(newIndex<0){
		return _tree.updateIn(newListPath,list=>list.unshift(item));
	}
	if(newIndex>=newList.size){
		return _tree.updateIn(newListPath,list=>list.push(item));
	}
	return _tree.updateIn(newListPath,list=>list.splice(newIndex,0,item));
}

export default class Tree extends Component{
	static node = node
	constructor(props,context){
		super(props,context)
		this.state = {
			tree:props.tree
		,	addModePath:false
		,	startDrag:null
		};
	}
	changeOrder(path,add){
		const tree = changeTreeOrder(this.state.tree,path,add);
		if(tree){
			this.setState({tree})
		}
	}
	beginDrag = (path) => {
		this.setState({startDrag:path});
	}
	isDragging = () => {
		return !!this.state.startDrag;
	}
	endDrag = (endPath,add=0) => {
		const startPath = this.state.startDrag;
		if(!startPath || endPath){
			this.setState({startDrag:null});
		};
		const tree = move(this.state.tree,startPath,endPath,add);
		this.setState({
			tree
		,	startDrag:null
		});
	}
	addMode = (path) =>{
		this.setState({addModePath:path.join('/')});
	}
	stopAddMode = (path) =>{
		this.setState({addModePath:false});
	}
	isItemInAddMode = (path) =>{
		return path.join('/') === this.state.addModePath;
	}
	up = (path) =>{
		this.changeOrder(path,-1);
	}
	down = (path) =>{
		this.changeOrder(path,1);
	}
	add = (path,value) => {
		path.push('children');
		const val = node(value);
		const tree = this.state.tree.updateIn(path,list=>list.push(val));
		this.setState({tree});
	}
	label = (path,value) => {
		path.push('label');
		const tree = this.state.tree.setIn(path,value);
		this.setState({tree});
	}
	render(){
		const {tree} = this.state;
		const props = {
			node:tree
		,	add:this.add
		,	path:[]
		,	changeLabel:this.label
		,	up:this.up
		,	down:this.down
		,	addMode:this.addMode
		,	isItemInAddMode:this.isItemInAddMode
		,	beginDrag:this.beginDrag
		,	endDrag:this.endDrag
		,	isDragging:this.isDragging
		}
		return (<Node {...props}/>)
	}
}