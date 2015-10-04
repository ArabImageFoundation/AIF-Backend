import {objForEach} from '../../utils';
import {STATUS_LOADED} from '../../constants/statuses';

const isNotInvalidated = {isInvalidated:false,status:STATUS_LOADED}

export function receiveDirectory(state,action){
	const receivedFiles = action.response;
	const files = state.files.slice();
	const indexes = Object.assign({},state.indexes);
	var changed = false;
	objForEach(receivedFiles,file=>{
		const {path} = file;
		const fileIndex = indexes[path];
		if(typeof  fileIndex == 'undefined'){
			indexes[path] = files.push(Object.assign({},file,isNotInvalidated))-1;
			changed = true;
		}else if(files[fileIndex].isInvalidated){
			files[fileIndex] = Object.assign({},file,isNotInvalidated);
			changed = true;
		}
	});
	if(changed){
		return Object.assign({},state,{files,indexes});
	}
	return state;
}