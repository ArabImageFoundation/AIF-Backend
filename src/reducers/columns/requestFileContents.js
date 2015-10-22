import {requestDirectory} from './requestDirectory';

export function requestFileContents(state,action){
	return requestDirectory(state,action);
}