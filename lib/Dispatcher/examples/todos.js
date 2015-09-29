import domReady from 'domready';
import React from 'react';
import Dispatcher from '../';

let initialState = {
	title:'Todos Example'
,	show:'all'
}

let todos = [
	{
		id:0
	,	checked:true
	,	text:'do the classical todo app'
	}
,	{
		id:1
	,	checked:false
	,	text:'make it look good'
	}
]
let todosCounter = todos.length;

let visibilityStore = {
	path:['show']
,	actions:[
		{
			match:/show/
		,	run(show,newShow,callback){
				callback(null,newShow);
			}
		}
	]
}

let todosStore = {
	path:['todos']
,	defaults(originalVal,args,callback){
		setTimeout(function(){
			callback(null,todos);
		},1000) //simulate server loading
	}
,	actions:[
		{
			match:/updateTodoChecked/
		,	run(todos,args,callback){
				args.checked = !args.checked
				callback(null,args,args.id);
			}
		}
	,	{
			match:/updateTodoText/
		,	run(todos,{todo,text},callback){
				todo.text = text
				callback(null,todo,todo.id);
			}
		}
	,	{
			match:/createTodo/
		,	run(todos,args,callback){
				let todo = {
					checked:false
				,	text:args
				,	id:todosCounter++
				}
				callback(null,todo,'push');
			}
		}
	]
}

let dispatcher = Dispatcher({
	initialState
,	stores:[
		visibilityStore
	,	todosStore
	]
})

let Todo = React.createClass({
	getInitialState(){
		return {
			editable:false
		}	
	}
,	onCheckedChange(){
		dispatcher.run('updateTodoChecked',this.props)
	}
,	onTextChange(evt){
		let value = evt.target.value;
		dispatcher.run('updateTodoText',{todo:this.props,text:value})
	}
,	onKeyDown(evt){
		if(evt.keyCode==13){ //enter
			this.onClick(evt);
		}else if(evt.keyCode==27){ //escape
			dispatcher.run('updateTodoText',{todo:this.props,text:this.oldValue})
			this.onClick();
		}
	}
,	onClick(evt){
		this.oldValue = this.props.text;
		this.setState({editable:!this.state.editable});
	}
,	componentDidUpdate(){
		let input = this.refs.input;
		if(input){
			React.findDOMNode(input).focus();
		}
	}
,	render(){
		return (<li>
			<input type='checkbox' checked={this.props.checked} onChange={this.onCheckedChange}/>
			{this.state.editable ?
				<input type='text' value={this.props.text} onChange={this.onTextChange} onBlur={this.onClick} onKeyDown={this.onKeyDown} ref='input'/> :
				<span onClick={this.onClick}>{this.props.text}</span>
			}
		</li>)
	}
})

let Test = React.createClass({
	mixins:[Dispatcher.mixin]
,	onSubmit(evt){
		let node = React.findDOMNode(this.refs.newTodo);
		dispatcher.run('createTodo',node.value);
		node.value = '';
		evt.preventDefault();
	}
,	componentDidMount(){
		//ideally, this would load with the page instead
		//of inside componentDidMount, but this is
		//simplified code
		dispatcher.init();
	}
,	render(){
		let {title,todos,show} = this.state;
		let showChecked = (show == 'all' || show == 'checked');
		let showUnchecked = (show == 'all' || show == 'unchecked');
		let showAll = (show == 'all');
		return (<div>
			<h1>{title}</h1>
			<form onSubmit={this.onSubmit}>
				<input defaultValue='' ref='newTodo'/>
			</form>
			<br/>
			<div>
				<a onClick={()=>dispatcher.run('show','all')}>show all</a> | 
				<a onClick={()=>dispatcher.run('show','checked')}>show checked</a> | 
				<a onClick={()=>dispatcher.run('show','unchecked')}>show unchecked</a>
			</div>
			<hr/>
			<ul style={{listStyle:'none'}}>
				{dispatcher.started ? 
					todos.map(function(todo,i){
						if(todo.checked && showChecked || !todo.checked && showUnchecked){
							return <Todo {...todo} key={i}/>
						}
						return null;
					}) :
					<div>...loading</div>
				}
			</ul>
			<hr/>
		</div>);
	}
})

domReady(ready);

function ready(){
	let node = document.getElementById('Wrapper');
	React.render(React.createElement(Test,{dispatcher}),node);
}