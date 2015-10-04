function mapFileToColumn(action){
	return {
		status:STATUS_LOADED
	,	objectId:action.objectId
	}
}

export function receiveFile(state,action){
	const {columnId,path} = action
	return state.map(column =>
		(column.path == path)?
			Object.assign({},column,mapFileToColumn(action)) :
			column
	)
}