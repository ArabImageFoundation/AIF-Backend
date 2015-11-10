import {camelCaseToConst} from '../../utils';
import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';

export function arrDiff(oldArr,newArr){
	if(!newArr.length){return oldArr;}
	var resultArr = [];
	newArr.forEach(item=>{
		if(oldArr.indexOf(item)<0){
			resultArr.push(item);
		}
	});
	return resultArr;
}

export function assign(obj,...props){
	return Object.assign({},obj,...props);
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
