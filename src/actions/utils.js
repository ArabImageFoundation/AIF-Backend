import Promise from 'bluebird';
import {camelCaseToConst} from '../utils';

function makeDispatch(dispatch,type){
	return function disp(suffix,props){
		return dispatch(Object.assign({type:`${type}_${suffix}`},props));
	}
}

function makeSyncActionCreator(type,metaDefault){
	function syncActionCreator(_meta){
		return {
			type
		,	meta:Object.assign({},metaDefault,_meta)
		}
	}
	syncActionCreator.defaultAction = {type,meta:metaDefault};
	return syncActionCreator;
}

function makeAsyncActionCreator(type,metaDefault){
	const fn = metaDefault.async;
	const check = metaDefault.check;
	delete metaDefault.async;
	delete metaDefault.check;
	function AsyncActionCreator(_meta){
		const meta = Object.assign({},metaDefault,_meta)
		return (dispatch,getState) => {
			if(check && !check(getState(),_meta)){return;}
			const disp = makeDispatch(dispatch,type)
			disp('START',{meta});
			return fn(meta,dispatch,getState,disp)
				.then(payload=>disp('SUCCESS',{payload,meta}))
				.catch(error=>disp('ERROR',{error:true,payload:{error,message:error.message},meta}) && console.log(error.message))
		}
	}

	AsyncActionCreator.defaultAction = {type,meta:metaDefault,suffixes:true}
	return AsyncActionCreator;
}

export function makeActionCreators(obj){
	const ret = {};
	Object.keys(obj).forEach(name=>{
		const type = camelCaseToConst(name);
		const action = obj[name];
		ret[name] = (action.async)?
			makeAsyncActionCreator(type,action) :
			makeSyncActionCreator(type,action)
		;
	});
	return ret;
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
