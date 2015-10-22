export function receiveFileContents(state,action){
	const {path} = action
	const files = state.files.map(file=>
		file.path == path ? 
			Object.assign({},file,{contents:action.response}) :
			file
	)
	return Object.assign({},state,{files});
}