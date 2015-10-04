function shouldFetchFileContents(state, file,position=0){
	return true;
}

export function fetchFileContentsIfNeeded(file,columnId=0){
	return(dispatch, getState)=>{
		const state = getState();
		if (shouldFetchFileContents(state, file)){
			return dispatch(fetchFileContents(file,columnId));
		}
	};
}