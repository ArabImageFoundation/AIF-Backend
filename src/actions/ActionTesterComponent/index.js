import React,{Component} from 'react'
import actions from '../index.js';
import ActionCreator from './ActionCreator';

class ActionTesterComponent extends Component{
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

export default ActionTesterComponent;
