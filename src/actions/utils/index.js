import Promise from 'bluebird';
import {camelCaseToConst} from '../../utils';
import initialState from '../initialState';

export getMimeType from './mimeTypes';

export function toType(obj) {
	return obj ? Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase() : 'undefined'
}

export function pad(str,len,char){
	len = len || 10;
	str=String(str);
	return (Array(len).join(char||'0') + str).slice(-Math.max(len,str.length));}

function makeDispatch(dispatch,type){
	return function disp(suffix,props){
		return dispatch(Object.assign({type:`${type}_${suffix}`},props));
	}
}

function makeSyncActionCreator(type,metaDefault={}){
	function syncActionCreator(_meta){
		return {
			type
		,	meta:Object.assign({},metaDefault,_meta)
		}
	}
	syncActionCreator.defaultAction = {type,meta:metaDefault};
	return syncActionCreator;
}

function makeAsyncActionCreator(type,fn,metaDefault={}){
	function AsyncActionCreator(_meta){
		const meta = Object.assign({},metaDefault,_meta)
		return (dispatch,getState) => {
			const disp = makeDispatch(dispatch,type)
			disp('START',{meta});
			const promise = fn(meta,{dispatch,getState,disp});
			if(!promise.then){
				return promise;
			}
			return promise.then(payload=>disp('SUCCESS',{payload,meta}))
				.catch(error=>disp('ERROR',{error:true,payload:{error,message:error.message},meta}) && console.log(error.message))
		}
	}

	AsyncActionCreator.defaultAction = {type,meta:metaDefault,suffixes:true}
	return AsyncActionCreator;
}

export function assign(obj,...props){
	return Object.assign({},obj,...props);
}

export function createReducer(handlers){
	const keys = {};
	Object.keys(handlers).forEach(name=>{
		keys[camelCaseToConst(name)] = name;
	});
	return function reducer(state = initialState,action){
		if(!Object.prototype.hasOwnProperty.call(keys,action.type)){return state;}
		const fnName = keys[action.type];
		const fn = handlers[keys[action.type]];
		const {meta,payload} = action
		return fn(state,meta,payload);
	}
}

export function makeActionCreators(obj){
	const actions= {};
	const reducers = {};
	Object.keys(obj).forEach(name=>{
		const type = camelCaseToConst(name);
		const action = obj[name];
		const {meta,reducer,async} = action;
		if(reducer){
			if(typeof reducer == 'function'){
				reducers[async? `${name}Success` : name] = reducer;
			}else{
				for(var n in reducer){
					reducers[`${name}_${n}`] = reducer[n];
				}
			}
		}
		actions[name] = (async)?
			makeAsyncActionCreator(type,async,meta) :
			makeSyncActionCreator(type,meta)
		;
	});
	return [actions,createReducer(reducers)];
}

export function get(url){
	return fetch(url)
		.then(httpStatus)
		.then(httpJSON)
		.then(json =>{
			if(json.error){throw new Error(json.error.message);}
			return json.result;
		})
}

function httpStatus(response){
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	throw new Error(response.statusText)
}

function httpJSON(response){
	return response.json();
}

function httpText(response){
	return response.text();
}
