import {STATUS_ERROR} from '../../constants/statuses';

function errorToJson(error){
	return {
		code:error.code
	,	message:error.message
	,	stack:error.getStack && error.getStack().split('\n') || false
	}
}

export function errorFetching(state,action){
	const {path} = action;
	const {files} = state;
	const _files = files.map(file=>
		(file.path == path)?
			Object.assign({},file,{status:STATUS_ERROR,error:errorToJson(action.error)}) :
			file
	);
	return Object.assign({},state,{files:_files});
}