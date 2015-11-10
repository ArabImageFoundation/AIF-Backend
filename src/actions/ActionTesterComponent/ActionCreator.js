import React,{Component} from 'react'

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

function valueToField(id,name,defaultValue,dataType){
	var component;
	const type = dataType=='date'?'date':dataType=='number'?'number':'text';
	const step = dataType=='number' && 1;
	const props = {
		name
	,	id
	,	type
	,	step
	,	"data-type":dataType
	}
	if(dataType == 'array' && defaultValue.length){
		props['data-type'] = 'string'
		component = (<select {...props}>
			{defaultValue.map((val,k)=>
				<option value={val} key={k}>{val}</option>
			)}
		</select>)
	}else{
		if(dataType == 'array'){
			props.defaultValue = '';
		}else{
			props.defaultValue = defaultValue;
		}
		component = <input {...props}/>;
	}
	return (<div key={name}>
		<label htmlFor={id} style={{width:'5em',display:'inline-block'}}>{name}</label>
		{component}
	</div>)
}

const onClick = (setState,isOpen) => (evt) =>{
	evt.preventDefault();
	setState({isOpen:!isOpen});
}
const onSubmit = (dispatch,actionCreator) => (evt) => {
	evt.preventDefault();
	var data = serialize(evt.target);
	dispatch(actionCreator(data));
}
class ActionCreator extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {isOpen:false}
		this._setState = this.setState.bind(this);
	}
	render(){
		const {name,defaultAction,actionCreator,dispatch} = this.props;
		const {isOpen} = this.state;
		const {_setState} = this;
		return (<div style={{borderBottom:'1px solid white',background:'#fdfdfd',color:'#222'}}>
			<h4 onClick={onClick(_setState,isOpen)} style={{cursor:'pointer'}}>{name}</h4>
			<div style={{display:isOpen?'block':'none'}}>
				<form onSubmit={onSubmit(dispatch,actionCreator)} name={defaultAction.type}>
				{Object.keys(defaultAction.meta).map(name=>{
					let defaultValue = defaultAction.meta[name];
					const dataType = (Array.isArray(defaultValue))?'array':(defaultValue instanceof Date)? 'date':(typeof defaultValue);
					const id = defaultAction.type+name;
					return valueToField(id,name,defaultValue,dataType)
				})}
				<input type="submit" value="send"/>
				</form>
			</div>
		</div>)
	}
}

export default ActionCreator;
