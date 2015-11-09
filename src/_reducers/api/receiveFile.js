import {appendFiles} from './appendFiles'

export function receiveFile(state,action){
	const {response} = action;
	const receivedFiles = [Object.assign({},response)];
	return appendFiles(state,receivedFiles);

}