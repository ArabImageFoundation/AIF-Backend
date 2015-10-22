import {appendFiles} from './appendFiles'

export function receiveDirectory(state,action){
	const {response} = action;
	const receivedFiles = response.files.slice();
	return appendFiles(state,receivedFiles);
}