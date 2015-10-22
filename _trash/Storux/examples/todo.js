import domReady from 'domready';
import React from 'react';
import Storux,{toImmutable} from '../';

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
];
let todoCounter = todos.length;

let state,store

function findTodoIndex(list,index){
	return list.findIndex(function(item){return item.get("id") === index;}) 
}

Storux({
	data(done){
		done({
			title:'Example'
		,	currentTodo:''
		});
	}
,	writingNewTodo(data,done,text){
		done(data.setIn(['currentTodo'],text));
	}
,	todos:{
		data(done){
			setTimeout(function(){
				done(todos);
			},1000);
		}
	,	create(list,done){
			let text = state.currentTodo;
			if(!text){return done();}
			let todo = toImmutable({
				id:todoCounter++
			,	text:text
			,	checked:false
			});
			data.writingNewTodo('');
			done(list.push(todo));
		}
	,	updateChecked(list,done,id,checked){
			done(list.setIn([findTodoIndex(list,id),'checked'],!checked));
		}
	,	updateText(list,done,id,text){
			done(list.setIn([findTodoIndex(list,id),'text'],text));
		}
	,	delete(list,done,id){
			done(list.deleteIn([findTodoIndex(list,id)]));
		}
	}
,	options:{
		data(done){
			done({
				visibility:'all'
			})
		}
	,	show(data,done,visibility){
			done(data.setIn(['visibility'],visibility));
		}
	}
})((_store)=>{
	store = _store;
	state = store.getState();
	store.on('*',function(){
		state = store.getState();
		render(state);
	});
	render(state);
});

let Todo = React.createClass({
	getInitialState(){
		return {
			editable:false
		}	
	}
,	onCheckedChange(){
		let {id,checked} = this.props
		store.todos.updateChecked(id,checked)
	}
,	onTextChange(evt){
		let text = evt.target.value;
		let {id} = this.props;
		store.todos.updateText(id,text);
	}
,	onKeyDown(evt){
		if(evt.keyCode==13){ //enter
			this.editableToggle();
		}else if(evt.keyCode==27){ //escape
			let {id} = this.props;
			let text = this.oldValue;
			store.todos.updateText(id,text);
			this.editableToggle();
		}
	}
,	editableToggle(){
		this.oldValue = this.props.text;
		this.setState({editable:!this.state.editable});
	}
,	delete(){
		store.todos.delete(this.props.id);
	}
,	componentDidUpdate(){
		let input = this.refs.input;
		if(input){
			React.findDOMNode(input).focus();
		}
	}
,	render(){
		let {checked,text} = this.props;
		return (<li style={{textDecoration:(checked?'line-through':'none')}}>
			<input type='checkbox' checked={checked} onChange={this.onCheckedChange}/>
			{this.state.editable ?
				<input type='text' value={text} onChange={this.onTextChange} onBlur={this.onClick} onKeyDown={this.onKeyDown} ref='input'/> :
				<span onClick={this.editableToggle}>{text}<button onClick={this.delete}>x</button></span>
			}
		</li>)
	}
})

let Test = React.createClass({
	onSubmit(evt){
		store.todos.create();
		evt.preventDefault();
	}
,	onChange(evt){
		store.writingNewTodo(evt.target.value);
	}
,	render(){
		let {title,todos,options,currentTodo} = this.props;
		let visibility = options && options.visibility || 'all';
		let showChecked = (visibility == 'all' || visibility == 'checked');
		let showUnchecked = (visibility == 'all' || visibility == 'unchecked');
		let showAll = (visibility == 'all');
		return (<div>
			<h1>{title}</h1>
			<form onSubmit={this.onSubmit}>
				<input value={currentTodo} ref='newTodo' onChange={this.onChange}/>
			</form>
			<br/>
			<div>
				<a onClick={()=>store.options.show('all')}>show all</a> | 
				<a onClick={()=>store.options.show('checked')}>show checked</a> | 
				<a onClick={()=>store.options.show('unchecked')}>show unchecked</a>
			</div>
			<hr/>
			<ul style={{listStyle:'none'}}>
				{todos ? 
					todos.map(function(todo,i){
						if(
							visibility=='all' || 
							(todo.checked && (visibility=='unchecked')) || 
							(!todo.checked && (visibility=='unchecked'))
						){
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

function render(state){
	let node = document.getElementById('Wrapper');
	React.render(React.createElement(Test,state),node);
}

domReady(function(){
	render();
});