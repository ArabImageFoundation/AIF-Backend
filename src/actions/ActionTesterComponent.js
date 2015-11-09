import React,{Component} from 'react'
import actions from './index.js';

function serialize(form) {
	const s = {};
	const {length} = form.elements;
	for(let i=0;i<length;i++){
		let field = form.elements[i];
		const {name,type} = field;
		const dataType = field.dataset.type;
		if(!name || field.disabled || /file|reset|submit|button/i.test(type)){continue;}
		if(type == 'select-multiple'){
			let j = field.options.length;
			s[name] = [];
			while(j>=0){
				let option = field.options[j--]
				if(option.selected){
					s[name].push(encodeURIComponent(options.value));
				}
			}
			continue;
		}
		if(type == 'select'){
			s[name] = field.options[field.selectedIndex];
			continue;
		}
		if(type == 'checkbox' || type == 'radio'){
			s[name] = s[name] || [];
			s[name].push(field.checked);
			continue;
		}
		if(dataType == 'array'){
			s[name] = field.value.split(',').map(val=>val?val.trim():false).filter(Boolean);
			continue;
		}
		s[name] = field.value;
	}
	return s;
}

class ActionCreator extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {isOpen:false}
	}
	onClick = (evt)=>{
		evt.preventDefault();
		this.setState({isOpen:!this.state.isOpen});
	}
	onSubmit = (evt) => {
		const {dispatch,actionCreator} = this.props;
		evt.preventDefault();
		var data = serialize(evt.target);
		dispatch(actionCreator(data));
	}
	render(){
		const {name,defaultAction} = this.props;
		const {isOpen} = this.state;
		return (<div style={{borderBottom:'1px solid white',background:'#fdfdfd',color:'#222'}}>
			<h4 onClick={this.onClick} style={{cursor:'pointer'}}>{name}</h4>
			<div style={{display:isOpen?'block':'none'}}>
				<form onSubmit={this.onSubmit} name={defaultAction.type}>
				{Object.keys(defaultAction.meta).map(name=>{
					let defaultValue = defaultAction.meta[name];
					const dataType = (Array.isArray(defaultValue))?'array':(defaultValue instanceof Date)? 'date':(typeof defaultValue);
					if(dataType == 'array'){defaultValue = defaultValue.join(',');}
					const type = dataType=='date'?'date':dataType=='number'?'number':'text';
					const step = dataType=='number' && 1;
					const id = defaultAction.type+name;
					const props = {
						name
					,	id
					,	type
					,	defaultValue
					,	step
					,	"data-type":dataType
					}
					return (<div key={name}>
						<label htmlFor={id} style={{width:'5em',display:'inline-block'}}>{name}</label>
						<input {...props}/>
					</div>)
				})}
				<input type="submit" value="send"/>
				</form>
			</div>
		</div>)
	}
}

export default class ActionTesterComponent extends Component{
	render(){
		const {dispatch} = this.props;
		return (<div>
			{Object.keys(actions).map((name,key)=>{
				const actionCreator = actions[name];
				const {defaultAction} = actionCreator;
				const props = {
					key
				,	name
				,	defaultAction
				,	dispatch
				,	actionCreator
				}
				return (<ActionCreator {...props}/>)
			})}
		</div>)
	}
}
