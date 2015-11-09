import {camelCaseToConst} from '../../utils';
import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';

export function assign(obj,...props){
	return Object.assign({},obj,...props);
}

export function changeObjectAtIndex(state,index,props){
	var changed = false;
	var _state = state.map((obj,i)=>{
		if(i==index){
			changed = true;
			return assign(obj,props);
		}
		return obj;
	});
	return changed?_state:state;
}

export function invertObjectPropertyAtIndex(state,index,prop){
	var changed = false;
	var _state = state.map((obj,i)=>{
		if(i==index){
			changed = true;
			return assign(obj,{[prop]:!!!obj.prop});
		}
		return obj;
	})
	return changed?_state:state;
}

export function changeObjectWhere(state,props,fn){
	var changed = false;
	var _state = state.map((obj,i)=>{
		if(fn(obj,i)){
			changed = true;
			return assign(obj,props);
		}
		return obj;
	})
	return changed?_state:state;
}

export function invertObjectPropertyWhere(state,prop,fn){
	var changed = false;
	var _state = state.map((obj,i)=>{
		if(fn(obj,i)){
			changed = true;
			return assign(obj,{[prop]:!!!obj.prop});
		}
		return obj;
	})
	return changed?_state:state;
}

export function createReducer(initialState, handlers){
	const keys = {};
	Object.keys(handlers).forEach(name=>{
		keys[camelCaseToConst(name)] = name;
	});
	return function reducer(state = initialState,action){
		if(!Object.prototype.hasOwnProperty.call(keys,action.type)){return state;}
		const fnName = keys[action.type];
		const fn = handlers[keys[action.type]];
		return fn(state,action);
	}
}
