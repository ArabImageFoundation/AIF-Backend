import {fetchFile} from './fetchFile';

function shouldFetchFile(state, file,position=0){
	return true;
}


export function fetchFileIfNeeded(file,columnId=0){
	return(dispatch, getState)=>{
		const state = getState();
		if (shouldFetchFile(state, file)){
			return dispatch(fetchFile(file,columnId));
		}
	};
}