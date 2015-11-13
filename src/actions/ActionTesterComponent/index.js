import React,{Component} from 'react'
import actions from '../actions.js';
import ActionCreator from './ActionCreator';

const {actionsCreators} = actions;
class ActionTesterComponent extends Component{
	render(){
		const {dispatch} = this.props;
		return (<div>
			{Object.keys(actionsCreators).map((name,key)=>{
				const actionCreator = actionsCreators[name];
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
