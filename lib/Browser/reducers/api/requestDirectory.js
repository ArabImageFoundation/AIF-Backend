import {STATUS_LOADING} from '../../constants/statuses';

export function requestDirectory(state,action){
	const {path} = action;
	const {files,indexes} = state;
	const _files = files.map(file =>
		file.path == path ?
			Object.assign({},file,{status:STATUS_LOADING}) :
			file
	);
	return Object.assign({},state,{files:_files})
}