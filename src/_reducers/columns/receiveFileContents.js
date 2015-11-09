import {receiveDirectory} from './receiveDirectory'

export function receiveFileContents(state,action){
	return receiveDirectory(state,action);
}