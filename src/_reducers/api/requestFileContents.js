import requestDirectory from './requestDirectory';

export function requestFileContents(state,action){
	requestDirectory(state,action);
}