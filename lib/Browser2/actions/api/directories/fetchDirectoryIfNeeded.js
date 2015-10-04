import {fetchDirectory} from './fetchDirectory'

function shouldFetchDirectory(state, directory='/',position=0){
	return true;
}

export function fetchDirectoryIfNeeded(directory='/',columnId=0){
	return(dispatch, getState)=>{
		const state = getState();
		if (shouldFetchDirectory(state, directory)){
			return dispatch(fetchDirectory(directory,columnId));
		}
	};
}