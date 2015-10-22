import {requestDirectory} from './requestDirectory';

export function requestFile(state,action){
	return requestDirectory(state,action);
}